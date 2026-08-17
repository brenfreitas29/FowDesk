import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { leads } = body;

    if (!Array.isArray(leads) || leads.length === 0) {
      return NextResponse.json({ error: 'No leads provided to confirm.' }, { status: 400 });
    }

    let createdCount = 0;
    const errors: string[] = [];

    for (const leadData of leads) {
      try {
        await prisma.lead.create({
          data: {
            name: leadData.name,
            clinicName: leadData.clinicName,
            specialty: leadData.specialty,
            neighborhood: leadData.neighborhood || null,
            phone: leadData.rawPhone || leadData.normalizedPhone,
            whatsapp: leadData.normalizedPhone,
            countryCode: leadData.countryCode || 'AR',
            phoneValid: leadData.phoneValid ?? true,
            whatsappAvailable: leadData.whatsappAvailable ?? true,
            website: leadData.website || null,
            instagram: leadData.instagram || null,
            priority: leadData.priority || 'MEDIUM',
            notes: leadData.notes || null,
            // Explicitly set default status as required by Rule #3
            status: 'REVIEW_REQUIRED',
            consentStatus: 'UNKNOWN',
            outreachEligible: false,
            optOut: false,
            doNotContact: false,
            requiresHumanResponse: false,
          },
        });
        createdCount++;
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'DB insert failed';
        errors.push(`Lead ${leadData.clinicName}: ${msg}`);
      }
    }

    await prisma.auditLog.create({
      data: {
        action: 'LEADS_IMPORTED',
        actor: 'Operator',
        details: `Imported ${createdCount} new leads into CRM (Default Status: REVIEW_REQUIRED).`,
      },
    });

    return NextResponse.json({
      success: true,
      createdCount,
      errors,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Import confirmation failed';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
