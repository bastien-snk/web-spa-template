import type { AnalyticsConsent } from '@/system/analytics/consent/types/analytics-consent';
import type { AnalyticsConsentStatus } from '@/system/analytics/consent/types/analytics-consent-status';
import { isAnalyticsConsentExpired } from '@/system/analytics/consent/services/is-analytics-consent-expired';

export function getEffectiveAnalyticsConsentStatus(consent: AnalyticsConsent): AnalyticsConsentStatus {
    if (isAnalyticsConsentExpired(consent)) return null;
    return consent.status;
}
