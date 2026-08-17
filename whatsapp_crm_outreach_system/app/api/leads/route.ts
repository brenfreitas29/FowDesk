import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { normalizePhoneNumber } from '@/lib/phone';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const search = searchParams.get('search');
    const filter = searchParams.get('filter');

    const whereClause: Record<string, unknown> = {};

    if (status && status !== 'ALL') {
      whereClause.status = status;
    }

    if (filter === 'DO_NOT_CONTACT') {
      whereClause.OR = [{ doNotContact: true }, { optOut: true }, { status: 'DO_NOT_CONTACT' }];
    } else if (filter === 'REPLIED') {
      whereClause.status = 'REPLIED';
    } else if (filter === 'HUMAN_REQUIRED') {
      whereClause.requiresHumanResponse = true;
    } else if (filter === 'REVIEW_REQUIRED') {
      whereClause.status = 'REVIEW_REQUIRED';
    } else if (filter === 'READY') {
      whereClause.status = { in: ['READY', 'APPROVED'] };
    }

    if (search) {
      whereClause.OR = [
        { name: { contains: search } },
        { clinicName: { contains: search } },
        { specialty: { contains: search } },
        { whatsapp: { contains: search } },
      ];
    }

    const leads = await prisma.lead.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' },
      include: {
        messages: {
          orderBy: { createdAt: 'asc' },
        },
      },
    });

    return NextResponse.json({ leads });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to fetch leads';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, clinicName, specialty, neighborhood, phone, website, instagram, priority, notes } = body;

    if (!name || !clinicName || !phone) {
      return NextResponse.json({ error: 'Name, clinic name, and phone are required.' }, { status: 400 });
    }

    const phoneResult = normalizePhoneNumber(phone, 'AR');

    const lead = await prisma.lead.create({
      data: {
        name,
        clinicName,
        specialty: specialty || 'Medicina General',
        neighborhood: neighborhood || null,
        phone: phoneResult.rawPhone,
        whatsapp: phoneResult.normalizedPhone,
        countryCode: phoneResult.countryCode,
        phoneValid: phoneResult.isValid,
        whatsappAvailable: phoneResult.isValid,
        website: website || null,
        instagram: instagram || null,
        priority: priority || 'MEDIUM',
        notes: notes || null,
        status: 'REVIEW_REQUIRED',
        consentStatus: 'UNKNOWN',
        outreachEligible: false,
      },
    });

    await prisma.auditLog.create({
      data: {
        leadId: lead.id,
        action: 'LEAD_CREATED',
        actor: 'Operator',
        details: `Lead created manually for ${clinicName} (${phoneResult.normalizedPhone}). Default status: REVIEW_REQUIRED.`,
      },
    });

    return NextResponse.json({ lead });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to create lead';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
