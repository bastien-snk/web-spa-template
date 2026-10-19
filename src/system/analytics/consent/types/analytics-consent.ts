import type { AnalyticsConsentStatus } from '@/system/analytics/consent/types/analytics-consent-status';

export type AnalyticsConsent = {
    status: AnalyticsConsentStatus;
    decidedAt: number | null;
};
