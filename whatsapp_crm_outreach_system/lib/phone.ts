export interface PhoneNormalizationResult {
  rawPhone: string;
  normalizedPhone: string;
  countryCode: string;
  isValid: boolean;
  validationStatus: 'VALID' | 'INVALID_LENGTH' | 'MISSING_DIGITS' | 'MALFORMED';
  formattedDisplay: string;
}

/**
 * Normalizes phone numbers to E.164 format with special handling for Argentine numbers (+54 9 ...).
 * Respects international numbers without corrupting non-AR country codes.
 */
export function normalizePhoneNumber(rawInput: string, defaultCountry = 'AR'): PhoneNormalizationResult {
  const rawPhone = rawInput || '';
  let cleaned = rawPhone.trim().replace(/[^\d+]/g, '');

  if (!cleaned) {
    return {
      rawPhone,
      normalizedPhone: '',
      countryCode: defaultCountry,
      isValid: false,
      validationStatus: 'MISSING_DIGITS',
      formattedDisplay: rawPhone,
    };
  }

  // Handle leading + or double zero
  if (cleaned.startsWith('00')) {
    cleaned = '+' + cleaned.slice(2);
  }

  const hasPlus = cleaned.startsWith('+');
  let digitsOnly = cleaned.replace(/\+/g, '');

  let countryCode = defaultCountry;
  let normalizedDigits = digitsOnly;

  // Argentina specific logic (+54)
  if (hasPlus && digitsOnly.startsWith('54')) {
    countryCode = 'AR';
    const rest = digitsOnly.slice(2); // after 54
    if (rest.startsWith('9')) {
      normalizedDigits = '54' + rest;
    } else if (rest.length === 10) {
      normalizedDigits = '549' + rest;
    } else {
      normalizedDigits = '54' + rest;
    }
  } else if (!hasPlus) {
    // Local number without + sign
    countryCode = defaultCountry;

    // Argentina local mobile formatting
    // Handle leading 0 (e.g. 011 15 4123 4567 or 011 4123 4567)
    if (normalizedDigits.startsWith('01115')) {
      normalizedDigits = '54911' + normalizedDigits.slice(5);
    } else if (normalizedDigits.startsWith('011')) {
      normalizedDigits = '54911' + normalizedDigits.slice(3);
    } else if (normalizedDigits.startsWith('1115')) {
      normalizedDigits = '54911' + normalizedDigits.slice(4);
    } else if (normalizedDigits.startsWith('15') && normalizedDigits.length === 10) {
      normalizedDigits = '54911' + normalizedDigits.slice(2);
    } else if (normalizedDigits.startsWith('0')) {
      normalizedDigits = normalizedDigits.slice(1);
      if (normalizedDigits.length === 10 && defaultCountry === 'AR') {
        normalizedDigits = '549' + normalizedDigits;
      }
    } else if (normalizedDigits.length === 10 && defaultCountry === 'AR') {
      normalizedDigits = '549' + normalizedDigits;
    } else if (normalizedDigits.startsWith('54')) {
      countryCode = 'AR';
      const rest = normalizedDigits.slice(2);
      if (!rest.startsWith('9') && rest.length === 10) {
        normalizedDigits = '549' + rest;
      }
    }
  } else {
    // Non-AR International number with leading +
    if (digitsOnly.startsWith('1') && digitsOnly.length === 11) countryCode = 'US';
    else if (digitsOnly.startsWith('34')) countryCode = 'ES';
    else if (digitsOnly.startsWith('52')) countryCode = 'MX';
    else if (digitsOnly.startsWith('55')) countryCode = 'BR';
    else if (digitsOnly.startsWith('57')) countryCode = 'CO';
    else countryCode = 'INTL';
  }

  const finalE164 = '+' + normalizedDigits;
  const totalDigits = normalizedDigits.length;
  const isValid = totalDigits >= 10 && totalDigits <= 15;

  let validationStatus: PhoneNormalizationResult['validationStatus'] = 'VALID';
  if (!isValid) {
    validationStatus = totalDigits < 10 ? 'MISSING_DIGITS' : 'INVALID_LENGTH';
  }

  let formattedDisplay = finalE164;
  if (countryCode === 'AR' && finalE164.startsWith('+549')) {
    const localPart = finalE164.slice(4);
    if (localPart.length === 10) {
      formattedDisplay = `+54 9 ${localPart.slice(0, 2)} ${localPart.slice(2, 6)}-${localPart.slice(6)}`;
    }
  }

  return {
    rawPhone,
    normalizedPhone: finalE164,
    countryCode,
    isValid,
    validationStatus,
    formattedDisplay,
  };
}
