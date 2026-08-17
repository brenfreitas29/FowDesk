import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { type, recipientPhone, messageText, metaMessageId, status } = body;

    let payload: Record<string, unknown> = {};

    if (type === 'INCOMING_MESSAGE') {
      payload = {
        object: 'whatsapp_business_account',
        entry: [
          {
            id: 'WHATSAPP_BUSINESS_ACCOUNT_ID',
            changes: [
              {
                value: {
                  messaging_product: 'whatsapp',
                  metadata: { display_phone_number: '12345678', phone_number_id: 'PHONE_ID' },
                  contacts: [{ profile: { name: 'Test Sender' }, wa_id: recipientPhone.replace(/\+/g, '') }],
                  messages: [
                    {
                      from: recipientPhone.replace(/\+/g, ''),
                      id: metaMessageId || `wamid.hbg.test_${Date.now()}`,
                      timestamp: `${Math.floor(Date.now() / 1000)}`,
                      type: 'text',
                      text: { body: messageText || 'Hola, me interesa' },
                    },
                  ],
                },
                field: 'messages',
              },
            ],
          },
        ],
      };
    } else if (type === 'STATUS_UPDATE') {
      payload = {
        object: 'whatsapp_business_account',
        entry: [
          {
            id: 'WHATSAPP_BUSINESS_ACCOUNT_ID',
            changes: [
              {
                value: {
                  messaging_product: 'whatsapp',
                  metadata: { display_phone_number: '12345678', phone_number_id: 'PHONE_ID' },
                  statuses: [
                    {
                      id: metaMessageId || 'wamid.test_msg_123',
                      status: (status || 'delivered').toLowerCase(),
                      timestamp: `${Math.floor(Date.now() / 1000)}`,
                      recipient_id: recipientPhone.replace(/\+/g, ''),
                    },
                  ],
                },
                field: 'messages',
              },
            ],
          },
        ],
      };
    } else {
      return NextResponse.json({ error: 'Unsupported simulation type. Use INCOMING_MESSAGE or STATUS_UPDATE.' }, { status: 400 });
    }

    // Forward to internal webhook POST route
    const webhookUrl = new URL('/api/webhooks/whatsapp', req.url);
    const response = await fetch(webhookUrl.toString(), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const resData = await response.json();
    return NextResponse.json({
      simulated: true,
      webhookResponse: resData,
      payloadSent: payload,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Simulation failed';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
