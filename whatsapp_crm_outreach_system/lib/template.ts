export interface LeadMessageVariables {
  first_name: string;
  clinic_name: string;
  specialty: string;
  neighborhood?: string;
  website?: string;
}

export const DEFAULT_INITIAL_TEMPLATE = `Hola {{first_name}}, ¿cómo estás?

Estuve revisando la presencia digital de {{clinic_name}} y vi algunas oportunidades para facilitar que nuevos pacientes conozcan sus servicios y puedan solicitar turnos online.

Trabajo desarrollando sitios web profesionales para clínicas y profesionales de salud.

Preparé algunas ideas específicas para {{specialty}}.

¿Te interesaría que te las comparta por aquí?`;

export const DEFAULT_FOLLOWUP_TEMPLATE = `Hola {{first_name}}.

Te escribo brevemente por mi mensaje anterior.

Si te interesa, puedo mostrarte una propuesta visual de cómo podría mejorar la presencia online de {{clinic_name}}, sin compromiso.

Si no es de interés, no hay problema.`;

/**
 * Interpolates variables safely into templates without inventing unverified facts.
 * Strips title prefixes (Dr., Dra., Doctor, Doctora) to isolate actual first name.
 */
export function renderMessageTemplate(templateText: string, vars: LeadMessageVariables): string {
  let rendered = templateText;

  let rawName = (vars.first_name || '').trim();
  // Strip common titles
  rawName = rawName.replace(/^(dr\.|dra\.|doctora|doctor)\s+/i, '');
  const firstName = rawName ? rawName.split(' ')[0] : 'Dr./Dra.';

  const clinicName = vars.clinic_name || 'su clínica';
  const specialty = vars.specialty || 'su especialidad médica';
  const neighborhood = vars.neighborhood ? ` en ${vars.neighborhood}` : '';

  rendered = rendered.replace(/\{\{first_name\}\}/g, firstName);
  rendered = rendered.replace(/\{\{clinic_name\}\}/g, clinicName);
  rendered = rendered.replace(/\{\{specialty\}\}/g, specialty);
  rendered = rendered.replace(/\{\{neighborhood\}\}/g, neighborhood);

  return rendered;
}
