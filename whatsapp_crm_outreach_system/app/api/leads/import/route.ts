import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { normalizePhoneNumber } from '@/lib/phone';
import * as XLSX from 'xlsx';
import Papa from 'papaparse';

export interface RawLeadRow {
  Name?: string;
  Nombre?: string;
  Clinic?: string;
  Clinica?: string;
  Specialty?: string;
  Especialidad?: string;
  Neighborhood?: string;
  Barrio?: string;
  Phone?: string;
  Telefono?: string;
  WhatsApp?: string;
  Whatsapp?: string;
  Website?: string;
  SitioWeb?: string;
  Instagram?: string;
  Priority?: string;
  Prioridad?: string;
  Notes?: string;
  Notas?: string;
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const buffer = await file.arrayBuffer();
    const fileName = file.name.toLowerCase();

    let rawRows: RawLeadRow[] = [];

    if (fileName.endsWith('.csv')) {
      const text = new TextDecoder().decode(buffer);
      const parsed = Papa.parse<RawLeadRow>(text, { header: true, skipEmptyLines: true });
      rawRows = parsed.data;
    } else if (fileName.endsWith('.xlsx') || fileName.endsWith('.xls')) {
      const workbook = XLSX.read(buffer, { type: 'array' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      rawRows = XLSX.utils.sheet_to_json<RawLeadRow>(worksheet);
    } else {
      return NextResponse.json({ error: 'Unsupported file format. Use CSV or XLSX.' }, { status: 400 });
    }

    // Fetch existing leads from database for duplicate checking
    const existingLeads = await prisma.lead.findMany({
      select: { whatsapp: true, phone: true, clinicName: true },
    });
    const existingWhatsAppSet = new Set(existingLeads.map((l) => l.whatsapp));
    const existingPhoneSet = new Set(existingLeads.map((l) => l.phone));

    const processedRows = [];
    const summary = {
      total: rawRows.length,
      valid: 0,
      invalid: 0,
      duplicate: 0,
      missingWhatsApp: 0,
      needsReview: 0,
    };

    for (let index = 0; index < rawRows.length; index++) {
      const row = rawRows[index];
      const name = (row.Name || row.Nombre || '').trim();
      const clinicName = (row.Clinic || row.Clinica || row.Name || row.Nombre || 'Clínica').trim();
      const specialty = (row.Specialty || row.Especialidad || 'Medicina General').trim();
      const neighborhood = (row.Neighborhood || row.Barrio || '').trim();
      const rawPhone = (row.WhatsApp || row.Whatsapp || row.Phone || row.Telefono || '').trim();
      const website = (row.Website || row.SitioWeb || '').trim();
      const instagram = (row.Instagram || '').trim();
      const priority = (row.Priority || row.Prioridad || 'MEDIUM').toUpperCase();
      const notes = (row.Notes || row.Notas || '').trim();

      const phoneResult = normalizePhoneNumber(rawPhone, 'AR');

      let category: 'VALID' | 'INVALID' | 'DUPLICATE' | 'MISSING_WHATSAPP' | 'NEEDS_REVIEW' = 'NEEDS_REVIEW';
      let issueReason = '';

      if (!phoneResult.isValid) {
        category = 'INVALID';
        issueReason = 'Formato de teléfono inválido o dígitos insuficientes.';
        summary.invalid++;
      } else if (existingWhatsAppSet.has(phoneResult.normalizedPhone) || existingPhoneSet.has(phoneResult.rawPhone)) {
        category = 'DUPLICATE';
        issueReason = 'Número de WhatsApp ya existe en el CRM.';
        summary.duplicate++;
      } else if (!name || !clinicName) {
        category = 'NEEDS_REVIEW';
        issueReason = 'Nombre de contacto o clínica faltante.';
        summary.needsReview++;
      } else {
        category = 'VALID';
        summary.valid++;
      }

      processedRows.push({
        tempId: `row-${index}-${Date.now()}`,
        name: name || 'Contacto sin nombre',
        clinicName: clinicName || 'Clínica',
        specialty,
        neighborhood,
        rawPhone: phoneResult.rawPhone,
        normalizedPhone: phoneResult.normalizedPhone,
        countryCode: phoneResult.countryCode,
        formattedPhone: phoneResult.formattedDisplay,
        phoneValid: phoneResult.isValid,
        whatsappAvailable: phoneResult.isValid,
        website,
        instagram,
        priority: ['LOW', 'MEDIUM', 'HIGH', 'URGENT'].includes(priority) ? priority : 'MEDIUM',
        notes,
        category,
        issueReason,
        // Rule #3: Default new leads to status = REVIEW_REQUIRED, outreachEligible = false
        status: 'REVIEW_REQUIRED',
        consentStatus: 'UNKNOWN',
        outreachEligible: false,
      });
    }

    return NextResponse.json({
      summary,
      rows: processedRows,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Error al procesar archivo';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
