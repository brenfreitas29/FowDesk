import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { checkOutreachEligibility } from '@/lib/eligibility';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const lead = await prisma.lead.findUnique({
      where: { id: params.id },
      include: {
        messages: {
          orderBy: { createdAt: 'asc' },
        },
        auditLogs: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!lead) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
    }

    const eligibility = checkOutreachEligibility(lead);

    return NextResponse.json({ lead, eligibility });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to fetch lead details';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const { status, doNotContact, optOut, notes, priority, requiresHumanResponse } = body;

    const existingLead = await prisma.lead.findUnique({ where: { id: params.id } });
    if (!existingLead) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
    }

    const updateData: Record<string, unknown> = {};

    if (status !== undefined) updateData.status = status;
    if (priority !== undefined) updateData.priority = priority;
    if (notes !== undefined) updateData.notes = notes;
    if (requiresHumanResponse !== undefined) updateData.requiresHumanResponse = requiresHumanResponse;

    // Handle Do Not Contact or Opt Out toggles
    if (doNotContact === true || optOut === true || status === 'DO_NOT_CONTACT') {
      updateData.doNotContact = true;
      updateData.optOut = true;
      updateData.status = 'DO_NOT_CONTACT';
      updateData.consentStatus = 'OPTED_OUT';
      updateData.outreachEligible = false;
      updateData.optOutAt = new Date();
      updateData.doNotContactAt = new Date();

      // Rule #4 & Rule #14: Cancel all pending queued messages for this lead
      await prisma.message.updateMany({
        where: { leadId: params.id, status: 'QUEUED' },
        data: { status: 'CANCELLED', errorCategory: 'Cancelled due to Do Not Contact / Opt Out' },
      });
    }

    const updatedLead = await prisma.lead.update({
      where: { id: params.id },
      data: updateData,
    });

    await prisma.auditLog.create({
      data: {
        leadId: params.id,
        action: 'LEAD_UPDATED',
        actor: 'Operator',
        details: `Lead parameters updated. Status: ${updatedLead.status}, DNC: ${updatedLead.doNotContact}`,
      },
    });

    return NextResponse.json({ lead: updatedLead });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to update lead';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
