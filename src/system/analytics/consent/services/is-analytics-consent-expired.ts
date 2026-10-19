import type { AnalyticsConsent } from '@/system/analytics/consent/types/analytics-consent';

export const ANALYTICS_CONSENT_MAX_AGE_MS = 180 * 24 * 60 * 60 * 1000;

export function isAnalyticsConsentExpired(consent: AnalyticsConsent, now: number = Date.now()): boolean {
    return consent.decidedAt !== null && now - consent.decidedAt >= ANALYTICS_CONSENT_MAX_AGE_MS;
}
