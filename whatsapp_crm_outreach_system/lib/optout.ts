/**
 * Normalizes text by converting to lowercase, removing accents/diacritics,
 * and stripping non-alphanumeric punctuation.
 */
export function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove accents
    .replace(/[^\w\s]/gi, ' ') // replace punctuation with space
    .replace(/\s+/g, ' ') // collapse spaces
    .trim();
}

const OPTOUT_KEYWORDS_EXACT = [
  'stop',
  'baja',
  'cancelar',
  'salir',
  'unsubscribe',
];

const OPTOUT_PATTERNS = [
  /\bno\s+gracias\b/,
  /\bno\s+me\s+interesa\b/,
  /\bno\s+interesa\b/,
  /\bpor\s+favor\s+no\b/,
  /\bno\s+me\s+escriban\b/,
  /\bno\s+escribir\b/,
  /\bno\s+contactar\b/,
  /\bborrenme\b/,
  /\bretirar\b/,
  /\bno\s+mandes\b/,
  /\bno\s+enviar\b/,
  /\bsacar\s+de\s+la\s+lista\b/,
];

export interface OptOutCheckResult {
  isOptOut: boolean;
  matchedTrigger?: string;
}

/**
 * Evaluates whether an incoming message content conveys opt-out / do-not-contact intent.
 */
export function isOptOutRequest(messageContent: string): OptOutCheckResult {
  if (!messageContent) return { isOptOut: false };

  const normalized = normalizeText(messageContent);

  // Check exact keyword match
  if (OPTOUT_KEYWORDS_EXACT.includes(normalized)) {
    return { isOptOut: true, matchedTrigger: normalized };
  }

  // Check regex patterns
  for (const pattern of OPTOUT_PATTERNS) {
    if (pattern.test(normalized)) {
      return { isOptOut: true, matchedTrigger: pattern.source };
    }
  }

  return { isOptOut: false };
}
