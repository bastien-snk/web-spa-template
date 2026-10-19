import type { AnalyticsConsentReader } from '@/system/analytics/analytics-consent-reader';

export class UnavailableAnalyticsConsentReader implements AnalyticsConsentReader {
    isAccepted(): boolean {
        return false;
    }
}
