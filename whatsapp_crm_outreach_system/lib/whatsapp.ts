import { prisma } from './db';
import { checkOutreachEligibility } from './eligibility';

export interface SendMessageOptions {
  leadId: string;
  recipientPhone: string;
  content: string;
  type?: 'TEXT' | 'TEMPLATE';
  templateName?: string;
  actor?: string;
}

export interface SendMessageResult {
  success: boolean;
  status: 'DRY_RUN' | 'SENT' | 'FAILED' | 'BLOCKED';
  messageId?: string;
  metaMessageId?: string | null;
  error?: string;
  dryRun?: boolean;
}

export class WhatsAppService {
  /**
   * Main dispatch method for outreach and manual messages.
   * Strictly enforces Dry Run safety rules (never returns SENT in Dry Run mode).
   */
  static async sendMessage(options: SendMessageOptions): Promise<SendMessageResult> {
    const { leadId, recipientPhone, content, type = 'TEXT', templateName, actor = 'SYSTEM' } = options;

    // Retrieve lead to verify eligibility & DNC status
    const lead = await prisma.lead.findUnique({
      where: { id: leadId },
    });

    if (!lead) {
      return { success: false, status: 'BLOCKED', error: 'Lead record not found' };
    }

    // Explicit manual reply check: allow sending if status is APPROVED or if human operator is manually replying from Inbox, but block if DNC or Opted Out
    if (lead.doNotContact || lead.optOut || lead.status === 'DO_NOT_CONTACT') {
      await prisma.auditLog.create({
        data: {
          leadId,
          action: 'SEND_BLOCKED',
          actor,
          details: 'Attempted to send message to lead marked Do Not Contact or Opted Out.',
        },
      });
      return {
        success: false,
        status: 'BLOCKED',
        error: 'Lead is marked Do Not Contact or has opted out.',
      };
    }

    const sendEnabled = process.env.WHATSAPP_SEND_ENABLED === 'true';
    const apiVersion = process.env.WHATSAPP_API_VERSION || 'v20.0';
    const phoneId = process.env.WHATSAPP_PHONE_NUMBER_ID;
    const token = process.env.META_ACCESS_TOKEN;

    // 1. DRY RUN MODE (WHATSAPP_SEND_ENABLED is false or unconfigured)
    if (!sendEnabled) {
      const message = await prisma.message.create({
        data: {
          leadId,
          direction: 'OUTBOUND',
          type,
          templateName,
          content,
          status: 'DRY_RUN',
          metaMessageId: null, // Dry run MUST NOT generate fake meta IDs
          actor,
          sentAt: new Date(),
        },
      });

      await prisma.lead.update({
        where: { id: leadId },
        data: {
          status: lead.status === 'REVIEW_REQUIRED' || lead.status === 'READY' ? 'APPROVED' : lead.status,
          lastContactAt: new Date(),
          firstContactAt: lead.firstContactAt ? lead.firstContactAt : new Date(),
        },
      });

      await prisma.auditLog.create({
        data: {
          leadId,
          action: 'DRY_RUN_OUTREACH',
          actor,
          details: `Dry run outreach recorded for ${recipientPhone}. No real Meta API request transmitted.`,
        },
      });

      return {
        success: true,
        status: 'DRY_RUN',
        dryRun: true,
        messageId: message.id,
        metaMessageId: null,
      };
    }

    // 2. PRODUCTION MULTI-CHECK VERIFICATION
    if (!token || !phoneId) {
      return {
        success: false,
        status: 'FAILED',
        error: 'Meta WhatsApp API credentials missing. Check META_ACCESS_TOKEN and WHATSAPP_PHONE_NUMBER_ID.',
      };
    }

    try {
      const url = `https://graph.facebook.com/${apiVersion}/${phoneId}/messages`;
      
      const payload: Record<string, unknown> = {
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to: recipientPhone.replace(/\+/g, ''),
        type: type === 'TEMPLATE' ? 'template' : 'text',
      };

      if (type === 'TEMPLATE' && templateName) {
        payload.template = {
          name: templateName,
          language: { code: 'es' },
        };
      } else {
        payload.text = { preview_url: false, body: content };
      }

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const responseData = await response.json();

      if (!response.ok) {
        const errorMsg = responseData?.error?.message || 'Meta API error';
        await prisma.message.create({
          data: {
            leadId,
            direction: 'OUTBOUND',
            type,
            templateName,
            content,
            status: 'FAILED',
            errorCategory: errorMsg,
            actor,
          },
        });

        await prisma.auditLog.create({
          data: {
            leadId,
            action: 'SEND_FAILED',
            actor,
            details: `Meta API send failed: ${errorMsg}`,
          },
        });

        return { success: false, status: 'FAILED', error: errorMsg };
      }

      const realMetaId = responseData?.messages?.[0]?.id || null;

      const message = await prisma.message.create({
        data: {
          leadId,
          direction: 'OUTBOUND',
          type,
          templateName,
          content,
          status: 'SENT',
          metaMessageId: realMetaId,
          actor,
          sentAt: new Date(),
        },
      });

      await prisma.lead.update({
        where: { id: leadId },
        data: {
          status: 'CONTACTED',
          lastContactAt: new Date(),
          firstContactAt: lead.firstContactAt ? lead.firstContactAt : new Date(),
        },
      });

      await prisma.auditLog.create({
        data: {
          leadId,
          action: 'MESSAGE_SENT',
          actor,
          details: `WhatsApp message dispatched via Meta Cloud API to ${recipientPhone} (Meta ID: ${realMetaId}).`,
        },
      });

      return {
        success: true,
        status: 'SENT',
        messageId: message.id,
        metaMessageId: realMetaId,
        dryRun: false,
      };
    } catch (err: unknown) {
      const errorStr = err instanceof Error ? err.message : 'Network failure';
      return { success: false, status: 'FAILED', error: errorStr };
    }
  }
}
