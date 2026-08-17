import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { WhatsAppService } from '@/lib/whatsapp';
import { normalizePhoneNumber } from '@/lib/phone';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { recipientPhone, messageContent, type = 'TEXT', templateName } = body;

    if (!recipientPhone || !messageContent) {
      return NextResponse.json(
        { error: 'Recipient phone and message content are required for test send.' },
        { status: 400 }
      );
    }

    // 1. Normalize test phone
    const normalized = normalizePhoneNumber(recipientPhone, 'AR');
    if (!normalized.isValid) {
      return NextResponse.json({ error: 'Invalid test phone format.' }, { status: 400 });
    }

    // 2. Test Number Whitelist Check (Rule #6: Test-number-only sending)
    const allowedTestNumbersRaw = process.env.WHATSAPP_TEST_PHONE_NUMBERS || '';
    const allowedList = allowedTestNumbersRaw
      .split(',')
      .map((num) => normalizePhoneNumber(num.trim()).normalizedPhone)
      .filter(Boolean);

    // If whitelist is configured, enforce target number match
    if (allowedList.length > 0 && !allowedList.includes(normalized.normalizedPhone)) {
      return NextResponse.json(
        {
          error: `Test send blocked: ${normalized.normalizedPhone} is not in WHATSAPP_TEST_PHONE_NUMBERS sandbox whitelist (${allowedList.join(', ')}).`,
          code: 'UNAUTHORIZED_TEST_NUMBER',
        },
        { status: 403 }
      );
    }

    // 3. Find or create temporary Sandbox Test Lead (never uses real CRM leads)
    let testLead = await prisma.lead.findFirst({
      where: { whatsapp: normalized.normalizedPhone, notes: 'SANDBOX_TEST_LEAD' },
    });

    if (!testLead) {
      testLead = await prisma.lead.create({
        data: {
          name: 'Contacto de Prueba Sandbox',
          clinicName: 'Sandbox Test Clinic',
          specialty: 'Testing',
          phone: normalized.rawPhone,
          whatsapp: normalized.normalizedPhone,
          countryCode: normalized.countryCode,
          phoneValid: true,
          whatsappAvailable: true,
          status: 'APPROVED',
          consentStatus: 'NOT_REQUIRED_FOR_CURRENT_FLOW',
          outreachEligible: true,
          notes: 'SANDBOX_TEST_LEAD',
        },
      });
    }

    // 4. Dispatch test message (respects WHATSAPP_SEND_ENABLED=false -> status DRY_RUN)
    const result = await WhatsAppService.sendMessage({
      leadId: testLead.id,
      recipientPhone: normalized.normalizedPhone,
      content: messageContent,
      type,
      templateName,
      actor: 'SandboxOperator',
    });

    return NextResponse.json({
      success: result.success,
      status: result.status,
      dryRun: result.dryRun ?? false,
      messageId: result.messageId,
      metaMessageId: result.metaMessageId ?? null,
      error: result.error,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Test send failed';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
