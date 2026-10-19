import { useEffect } from 'react';

import { useAnalyticsConsentStore } from '@/system/analytics/consent/analytics-consent-store';
import { getEffectiveAnalyticsConsentStatus } from '@/system/analytics/consent/services/get-effective-analytics-consent-status';

export function useAnalyticsConsent() {
    const status = useAnalyticsConsentStore((state) =>
        getEffectiveAnalyticsConsentStatus({ status: state.status, decidedAt: state.decidedAt }),
    );
    const setConsent = useAnalyticsConsentStore((state) => state.setConsent);
    const clearExpiredConsent = useAnalyticsConsentStore((state) => state.clearExpiredConsent);

    useEffect(() => {
        clearExpiredConsent();
    }, [clearExpiredConsent]);

    useEffect(() => {
        // Another tab can change localStorage without updating this tab's Zustand store.
        function handleStorage(event: StorageEvent) {
            if (event.key === 'web-spa-template.web-app.analytics-consent') {
                useAnalyticsConsentStore.persist.rehydrate();
            }
        }

        window.addEventListener('storage', handleStorage);
        return () => window.removeEventListener('storage', handleStorage);
    }, []);

    return {
        status: status,
        enabled: status === 'accepted',
        needsConsent: status === null,
        setConsent: setConsent,
    };
}
