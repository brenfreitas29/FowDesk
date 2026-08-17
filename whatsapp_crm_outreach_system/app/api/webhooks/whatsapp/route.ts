import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { isOptOutRequest } from '@/lib/optout';
import crypto from 'crypto';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  const verifyToken = process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN || 'crm_secure_webhook_token_2026';

  if (mode === 'subscribe' && token === verifyToken) {
    return new Response(challenge, { status: 200 });
  }

  return NextResponse.json({ error: 'Webhook verification failed' }, { status: 403 });
}

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('x-hub-signature-256');

    // Rule #12: Optional Meta Webhook HMAC Signature Validation
    const appSecret = process.env.META_APP_SECRET;
    if (appSecret && signature) {
      const expectedSignature = 'sha256=' + crypto.createHmac('sha256', appSecret).update(rawBody).digest('hex');
      if (signature !== expectedSignature) {
        return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 401 });
      }
    }

    const payload = JSON.parse(rawBody);

    // Meta Webhook Entry Loop
    const entry = payload.entry?.[0];
    const changes = entry?.changes?.[0];
    const value = changes?.value;

    if (!value) {
      return NextResponse.json({ status: 'ignored' }, { status: 200 });
    }

    // 1. PROCESS STATUS UPDATES (SENT, DELIVERED, READ, FAILED)
    if (value.statuses && Array.isArray(value.statuses)) {
      for (const statusObj of value.statuses) {
        const metaMessageId = statusObj.id;
        const metaStatus = (statusObj.status || '').toUpperCase(); // SENT, DELIVERED, READ, FAILED
        const eventId = `status_${metaMessageId}_${metaStatus}`;

        // Rule #13: Idempotency Check
        const existingEvent = await prisma.processedEvent.findUnique({ where: { eventId } });
        if (existingEvent) continue;

        const updateData: Record<string, unknown> = {};
        if (metaStatus === 'DELIVERED') {
          updateData.status = 'DELIVERED';
          updateData.deliveredAt = new Date(parseInt(statusObj.timestamp) * 1000 || Date.now());
        } else if (metaStatus === 'READ') {
          updateData.status = 'READ';
          updateData.readAt = new Date(parseInt(statusObj.timestamp) * 1000 || Date.now());
        } else if (metaStatus === 'FAILED') {
          updateData.status = 'FAILED';
          updateData.errorCategory = statusObj.errors?.[0]?.title || 'Delivery failed';
        }

        if (Object.keys(updateData).length > 0) {
          await prisma.message.updateMany({
            where: { metaMessageId },
            data: updateData,
          });
        }

        await prisma.processedEvent.create({
          data: { eventId, eventType: `STATUS_${metaStatus}` },
        });
      }
    }

    // 2. PROCESS INCOMING MESSAGES
    if (value.messages && Array.isArray(value.messages)) {
      for (const msgObj of value.messages) {
        const metaMessageId = msgObj.id;
        const fromPhone = msgObj.from; // Sender phone number e.g. 5491112345678
        const eventId = `msg_${metaMessageId}`;

        // Rule #13: Idempotency Check
        const existingEvent = await prisma.processedEvent.findUnique({ where: { eventId } });
        if (existingEvent) continue;

        let content = '';
        if (msgObj.type === 'text') {
          content = msgObj.text?.body || '';
        } else {
          content = `[Media: ${msgObj.type}]`;
        }

        // Match lead by WhatsApp phone
        const normalizedSender = fromPhone.startsWith('+') ? fromPhone : '+' + fromPhone;

        const lead = await prisma.lead.findFirst({
          where: {
            OR: [
              { whatsapp: normalizedSender },
              { whatsapp: { contains: fromPhone } },
              { phone: { contains: fromPhone } },
            ],
          },
        });

        if (lead) {
          // Rule #7: Create new Message record with direction = INBOUND
          await prisma.message.create({
            data: {
              leadId: lead.id,
              metaMessageId,
              direction: 'INBOUND',
              type: 'TEXT',
              content,
              status: 'DELIVERED',
              sentAt: new Date(parseInt(msgObj.timestamp) * 1000 || Date.now()),
            },
          });

          // Check Opt-out intent
          const optOutCheck = isOptOutRequest(content);

          if (optOutCheck.isOptOut) {
            // Rule #5 & #14: Handle Opt Out
            await prisma.lead.update({
              where: { id: lead.id },
              data: {
                optOut: true,
                doNotContact: true,
                status: 'DO_NOT_CONTACT',
                consentStatus: 'OPTED_OUT',
                outreachEligible: false,
                optOutAt: new Date(),
                doNotContactAt: new Date(),
                lastReplyAt: new Date(),
              },
            });

            // Cancel any pending follow-ups
            await prisma.message.updateMany({
              where: { leadId: lead.id, status: 'QUEUED' },
              data: { status: 'CANCELLED', errorCategory: 'Opt-out received' },
            });

            await prisma.auditLog.create({
              data: {
                leadId: lead.id,
                action: 'OPT_OUT_RECEIVED',
                actor: 'Webhook',
                details: `Contact requested opt-out ("${content}"). Status set to DO_NOT_CONTACT. All automated outreach suppressed.`,
              },
            });
          } else {
            // Rule #8: Human Handoff upon reply
            await prisma.lead.update({
              where: { id: lead.id },
              data: {
                status: 'REPLIED',
                lastReplyAt: new Date(),
                requiresHumanResponse: true,
                outreachEligible: false, // Stop automated sequence
              },
            });

            // Cancel any pending follow-ups
            await prisma.message.updateMany({
              where: { leadId: lead.id, status: 'QUEUED' },
              data: { status: 'CANCELLED', errorCategory: 'Inbound reply received - human handoff active' },
            });

            await prisma.auditLog.create({
              data: {
                leadId: lead.id,
                action: 'INBOUND_REPLY',
                actor: 'Webhook',
                details: `Inbound reply received from ${lead.clinicName}: "${content}". Automation stopped, HUMAN RESPONSE REQUIRED.`,
              },
            });
          }
        }

        await prisma.processedEvent.create({
          data: { eventId, eventType: 'INBOUND_MESSAGE' },
        });
      }
    }

    return NextResponse.json({ status: 'success' }, { status: 200 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Webhook error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
