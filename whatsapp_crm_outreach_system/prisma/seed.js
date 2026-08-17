const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding WhatsApp CRM database...');

  // Clean existing tables for repeatable local seed
  await prisma.auditLog.deleteMany();
  await prisma.message.deleteMany();
  await prisma.lead.deleteMany();
  await prisma.template.deleteMany();
  await prisma.campaign.deleteMany();

  // Create initial Campaign
  const campaign = await prisma.campaign.create({
    data: {
      name: 'Clínicas Buenos Aires - Agosto 2026',
      description: 'Campaña de prospección digital para clínicas médicas y odontológicas en CABA y GBA.',
      status: 'ACTIVE',
    },
  });

  // Seed sample Lead records with realistic Argentine clinic prospects
  const leadsData = [
    {
      name: 'Dr. Alejandro Benítez',
      clinicName: 'Clínica Odontológica Belgrano',
      specialty: 'Odontología General & Implantes',
      neighborhood: 'Belgrano, CABA',
      phone: '011 4782-9012',
      whatsapp: '+5491147829012',
      countryCode: 'AR',
      phoneValid: true,
      whatsappAvailable: true,
      email: 'contacto@odontobelgrano.com.ar',
      website: 'https://odontobelgrano.com.ar',
      instagram: '@odontobelgrano',
      priority: 'HIGH',
      status: 'REVIEW_REQUIRED', // Rule #3 default
      consentStatus: 'UNKNOWN',
      outreachEligible: false,
      campaignId: campaign.id,
      notes: 'Consultorio especializado en ortodoncia e implantes. Buena presencia en IG.',
    },
    {
      name: 'Dra. María Laura Rossi',
      clinicName: 'Centro Médico Dermatológico Palermo',
      specialty: 'Dermatología Estética & Láser',
      neighborhood: 'Palermo Soho, CABA',
      phone: '11 5123 4567',
      whatsapp: '+5491151234567',
      countryCode: 'AR',
      phoneValid: true,
      whatsappAvailable: true,
      email: 'turnos@dermatologiapalermo.com',
      website: null, // Verified missing website
      instagram: '@dermapalermo_ok',
      priority: 'URGENT',
      status: 'APPROVED',
      consentStatus: 'UNKNOWN',
      outreachEligible: true,
      approvedAt: new Date(),
      approvedBy: 'Operator',
      campaignId: campaign.id,
      notes: 'No poseen sitio web propio actualmente, solo agenda por Instagram.',
    },
    {
      name: 'Dr. Carlos Mendoza',
      clinicName: 'Sanatorio de la Salud Olivos',
      specialty: 'Pediatría & Traumatología',
      neighborhood: 'Olivos, Vicente López',
      phone: '+54 9 11 3987 6543',
      whatsapp: '+5491139876543',
      countryCode: 'AR',
      phoneValid: true,
      whatsappAvailable: true,
      priority: 'MEDIUM',
      status: 'REPLIED',
      consentStatus: 'UNKNOWN',
      outreachEligible: false,
      requiresHumanResponse: true, // Rule #8 flag
      lastReplyAt: new Date(Date.now() - 3600000),
      campaignId: campaign.id,
      notes: 'Respondió pidiendo más información sobre integración de turnos online.',
    },
    {
      name: 'Dra. Lucía Fernández',
      clinicName: 'Consultorios Médicos San Isidro',
      specialty: 'Ginecología & Obstetricia',
      neighborhood: 'San Isidro',
      phone: '011 4743 1122',
      whatsapp: '+5491147431122',
      countryCode: 'AR',
      phoneValid: true,
      whatsappAvailable: true,
      priority: 'LOW',
      status: 'DO_NOT_CONTACT',
      consentStatus: 'OPTED_OUT',
      outreachEligible: false,
      optOut: true,
      doNotContact: true,
      optOutAt: new Date(Date.now() - 86400000),
      doNotContactAt: new Date(Date.now() - 86400000),
      campaignId: campaign.id,
      notes: 'Solicitó no ser contactada ("No me interesa, gracias").',
    },
    {
      name: 'Dr. Gustavo Peralta',
      clinicName: 'Instituto Cardiovascular Recoleta',
      specialty: 'Cardiología & Hipertensión',
      neighborhood: 'Recoleta, CABA',
      phone: '11 6789 0123',
      whatsapp: '+5491167890123',
      countryCode: 'AR',
      phoneValid: true,
      whatsappAvailable: true,
      priority: 'HIGH',
      status: 'READY',
      consentStatus: 'UNKNOWN',
      outreachEligible: true,
      approvedAt: new Date(),
      approvedBy: 'Operator',
      campaignId: campaign.id,
      notes: 'Revisado y listo para recibir primer mensaje de prospección.',
    },
  ];

  for (const data of leadsData) {
    const lead = await prisma.lead.create({ data });

    // Seed sample messages for replied / opted-out contacts to showcase inbox
    if (lead.status === 'REPLIED') {
      await prisma.message.create({
        data: {
          leadId: lead.id,
          direction: 'OUTBOUND',
          type: 'TEXT',
          content: 'Hola Dr. Carlos, ¿cómo estás? Vi oportunidades para facilitar turnos online en Sanatorio Olivos. ¿Te interesa que lo conversemos?',
          status: 'DRY_RUN',
          sentAt: new Date(Date.now() - 7200000),
        },
      });
      await prisma.message.create({
        data: {
          leadId: lead.id,
          direction: 'INBOUND',
          type: 'TEXT',
          content: 'Hola, sí me interesa ver cómo funciona el sistema de turnos. ¿Me mandás un resumen?',
          status: 'DELIVERED',
          sentAt: new Date(Date.now() - 3600000),
        },
      });
    }

    if (lead.status === 'DO_NOT_CONTACT') {
      await prisma.message.create({
        data: {
          leadId: lead.id,
          direction: 'OUTBOUND',
          type: 'TEXT',
          content: 'Hola Dra. Lucía, ¿cómo estás? Te escribo de parte de desarrollo web...',
          status: 'DRY_RUN',
          sentAt: new Date(Date.now() - 90000000),
        },
      });
      await prisma.message.create({
        data: {
          leadId: lead.id,
          direction: 'INBOUND',
          type: 'TEXT',
          content: 'No me interesa, gracias. Por favor no me escriban más.',
          status: 'DELIVERED',
          sentAt: new Date(Date.now() - 86400000),
        },
      });
    }
  }

  // Seed standard Templates matching Rule #17 (localStatus vs metaStatus)
  await prisma.template.create({
    data: {
      templateName: 'outreach_clinica_v1',
      language: 'es',
      category: 'UTILITY',
      localStatus: 'READY',
      metaStatus: 'APPROVED',
      metaTemplateId: 'tpl_meta_981273',
      bodyText: `Hola {{first_name}}, ¿cómo estás?

Estuve revisando la presencia digital de {{clinic_name}} y vi algunas oportunidades para facilitar que nuevos pacientes conozcan sus servicios y puedan solicitar turnos online.

Trabajo desarrollando sitios web profesionales para clínicas y profesionales de salud.

Preparé algunas ideas específicas para {{specialty}}.

¿Te interesaría que te las comparta por aquí?`,
      variables: JSON.stringify(['first_name', 'clinic_name', 'specialty']),
    },
  });

  await prisma.template.create({
    data: {
      templateName: 'followup_clinica_v1',
      language: 'es',
      category: 'UTILITY',
      localStatus: 'READY',
      metaStatus: 'APPROVED',
      metaTemplateId: 'tpl_meta_981274',
      bodyText: `Hola {{first_name}}.

Te escribo brevemente por mi mensaje anterior.

Si te interesa, puedo mostrarte una propuesta visual de cómo podría mejorar la presencia online de {{clinic_name}}, sin compromiso.

Si no es de interés, no hay problema.`,
      variables: JSON.stringify(['first_name', 'clinic_name']),
    },
  });

  await prisma.auditLog.create({
    data: {
      action: 'SYSTEM_SEED',
      actor: 'System',
      details: 'Database seeded with initial prospects, templates, and safety rules.',
    },
  });

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
