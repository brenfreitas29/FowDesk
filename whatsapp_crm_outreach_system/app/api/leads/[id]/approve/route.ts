import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { checkOutreachEligibility } from '@/lib/eligibility';

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const lead = await prisma.lead.findUnique({ where: { id: params.id } });

    if (!lead) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
    }

    // Check basic phone & DNC conditions before approval
    if (!lead.phoneValid || !lead.whatsappAvailable) {
      return NextResponse.json(
        { error: 'Cannot approve lead with invalid phone or unavailable WhatsApp.' },
        { status: 400 }
      );
    }

    if (lead.doNotContact || lead.optOut) {
      return NextResponse.json(
        { error: 'Cannot approve lead that has opted out or is marked Do Not Contact.' },
        { status: 400 }
      );
    }

    const updatedLead = await prisma.lead.update({
      where: { id: params.id },
      data: {
        status: 'APPROVED',
        outreachEligible: true,
        approvedAt: new Date(),
        approvedBy: 'Operator',
        eligibilityCheckedAt: new Date(),
        eligibilityReason: 'Approved manually by operator after review.',
      },
    });

    await prisma.auditLog.create({
      data: {
        leadId: params.id,
        action: 'LEAD_APPROVED',
        actor: 'Operator',
        details: `Lead ${lead.clinicName} explicitly approved for outreach queue.`,
      },
    });

    return NextResponse.json({ lead: updatedLead });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Approval failed';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
