import type { AnalyticsConsentReader } from '@/system/analytics/analytics-consent-reader';
import { useAnalyticsConsentStore } from '@/system/analytics/consent/analytics-consent-store';
import { getEffectiveAnalyticsConsentStatus } from '@/system/analytics/consent/services/get-effective-analytics-consent-status';

export class PersistentAnalyticsConsentReader implements AnalyticsConsentReader {
    isAccepted(): boolean {
        const state = useAnalyticsConsentStore.getState();
        const status = getEffectiveAnalyticsConsentStatus({ status: state.status, decidedAt: state.decidedAt });
        return status === 'accepted';
    }
}
