import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { WhatsAppService } from '@/lib/whatsapp';
import { renderMessageTemplate, DEFAULT_INITIAL_TEMPLATE } from '@/lib/template';
import { checkOutreachEligibility } from '@/lib/eligibility';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { leadIds, customMessage, templateName, isFollowUp = false } = body;

    if (!Array.isArray(leadIds) || leadIds.length === 0) {
      return NextResponse.json({ error: 'No leads specified for outreach.' }, { status: 400 });
    }

    const results = [];

    for (const leadId of leadIds) {
      const lead = await prisma.lead.findUnique({ where: { id: leadId } });

      if (!lead) {
        results.push({ leadId, success: false, reason: 'Lead record not found' });
        continue;
      }

      // Explicit Eligibility Verification prior to dispatch
      const eligibility = checkOutreachEligibility(lead, isFollowUp);
      if (!eligibility.isEligible) {
        results.push({
          leadId,
          clinicName: lead.clinicName,
          success: false,
          reason: eligibility.reason,
          code: eligibility.code,
        });

        await prisma.auditLog.create({
          data: {
            leadId: lead.id,
            action: 'OUTREACH_BLOCKED',
            actor: 'OutreachEngine',
            details: `Outreach blocked for ${lead.clinicName}: ${eligibility.reason}`,
          },
        });

        continue;
      }

      // Generate personalized message content
      const finalMessageContent = customMessage
        ? customMessage
        : renderMessageTemplate(DEFAULT_INITIAL_TEMPLATE, {
            first_name: lead.name,
            clinic_name: lead.clinicName,
            specialty: lead.specialty,
            neighborhood: lead.neighborhood || undefined,
            website: lead.website || undefined,
          });

      // Dispatch via WhatsApp Service (handles Dry Run mode when WHATSAPP_SEND_ENABLED=false)
      const dispatchResult = await WhatsAppService.sendMessage({
        leadId: lead.id,
        recipientPhone: lead.whatsapp,
        content: finalMessageContent,
        type: templateName ? 'TEMPLATE' : 'TEXT',
        templateName,
        actor: 'Operator',
      });

      results.push({
        leadId: lead.id,
        clinicName: lead.clinicName,
        phone: lead.whatsapp,
        success: dispatchResult.success,
        status: dispatchResult.status,
        dryRun: dispatchResult.dryRun ?? false,
        error: dispatchResult.error,
      });
    }

    return NextResponse.json({
      processedCount: results.length,
      results,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Outreach send failed';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
