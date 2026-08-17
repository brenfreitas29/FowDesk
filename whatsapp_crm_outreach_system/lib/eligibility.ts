export interface LeadForEligibilityCheck {
  id: string;
  name: string;
  phone: string;
  whatsapp: string;
  phoneValid: boolean;
  whatsappAvailable: boolean;
  status: string;
  consentStatus: string;
  outreachEligible: boolean;
  optOut: boolean;
  doNotContact: boolean;
  requiresHumanResponse: boolean;
  followUpCount: number;
  maxFollowUpsAllowed: number;
  lastReplyAt?: Date | null;
}

export interface EligibilityResult {
  isEligible: boolean;
  reason: string;
  code:
    | 'ELIGIBLE'
    | 'INVALID_PHONE'
    | 'OPTED_OUT'
    | 'DO_NOT_CONTACT'
    | 'REPLIED_AWAITING_HUMAN'
    | 'NOT_APPROVED'
    | 'MAX_FOLLOWUPS_EXCEEDED'
    | 'CONSENT_DENIED';
}

/**
 * Audit-backed outreach eligibility checker.
 * Enforces strict consent, manual approval, and reply/opt-out suppression rules.
 */
export function checkOutreachEligibility(lead: LeadForEligibilityCheck, isFollowUp = false): EligibilityResult {
  // 1. Check phone validity & whatsapp availability
  if (!lead.phoneValid || !lead.whatsappAvailable || !lead.whatsapp || lead.whatsapp.length < 10) {
    return {
      isEligible: false,
      reason: 'Invalid phone number or WhatsApp unavailable.',
      code: 'INVALID_PHONE',
    };
  }

  // 2. Check explicit Do Not Contact or Opt Out flags
  if (lead.doNotContact || lead.status === 'DO_NOT_CONTACT') {
    return {
      isEligible: false,
      reason: 'Lead marked as Do Not Contact.',
      code: 'DO_NOT_CONTACT',
    };
  }

  if (lead.optOut || lead.consentStatus === 'OPTED_OUT') {
    return {
      isEligible: false,
      reason: 'Contact explicitly opted out of outreach.',
      code: 'OPTED_OUT',
    };
  }

  // 3. Check if lead has replied or requires human handoff
  if (lead.status === 'REPLIED' || lead.requiresHumanResponse || lead.lastReplyAt) {
    return {
      isEligible: false,
      reason: 'Lead has replied. Automated sequence stopped for human handoff.',
      code: 'REPLIED_AWAITING_HUMAN',
    };
  }

  // 4. Check follow-up limits (max 1 automated follow-up by default)
  if (isFollowUp && lead.followUpCount >= lead.maxFollowUpsAllowed) {
    return {
      isEligible: false,
      reason: `Maximum automated follow-ups (${lead.maxFollowUpsAllowed}) reached. Human review required.`,
      code: 'MAX_FOLLOWUPS_EXCEEDED',
    };
  }

  // 5. Must be explicitly approved or set to READY by a human operator
  if (lead.status !== 'APPROVED' && lead.status !== 'READY') {
    return {
      isEligible: false,
      reason: `Lead is in '${lead.status}' status. Requires manual review & approval before sending.`,
      code: 'NOT_APPROVED',
    };
  }

  return {
    isEligible: true,
    reason: 'Lead is fully eligible for outreach.',
    code: 'ELIGIBLE',
  };
}
