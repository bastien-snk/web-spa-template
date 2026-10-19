import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { AnalyticsConsentStatus } from '@/system/analytics/consent/types/analytics-consent-status';
import { getEffectiveAnalyticsConsentStatus } from '@/system/analytics/consent/services/get-effective-analytics-consent-status';
import { isAnalyticsConsentExpired } from '@/system/analytics/consent/services/is-analytics-consent-expired';

type AnalyticsConsentStore = {
    status: AnalyticsConsentStatus;
    decidedAt: number | null;
    setConsent: (status: Exclude<AnalyticsConsentStatus, null>) => void;
    clearExpiredConsent: () => void;
};

export const useAnalyticsConsentStore = create<AnalyticsConsentStore>()(
    persist(
        (set, get) => ({
            status: null,
            decidedAt: null,
            setConsent: (status) => set({ status: status, decidedAt: Date.now() }),
            clearExpiredConsent: () => {
                const consent = { status: get().status, decidedAt: get().decidedAt };
                if (isAnalyticsConsentExpired(consent)) set({ status: null, decidedAt: null });
            },
        }),
        {
            name: 'web-spa-template.web-app.analytics-consent',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({ status: state.status, decidedAt: state.decidedAt }),
            version: 1,
            merge: (persistedState, currentState) => {
                const persisted = persistedState as Partial<AnalyticsConsentStore> | undefined;
                const status =
                    persisted?.status === 'accepted' || persisted?.status === 'rejected' ? persisted.status : null;
                const decidedAt = typeof persisted?.decidedAt === 'number' ? persisted.decidedAt : null;
                const consent = { status: status, decidedAt: decidedAt };

                if (isAnalyticsConsentExpired(consent)) return { ...currentState, status: null, decidedAt: null };

                return { ...currentState, status: getEffectiveAnalyticsConsentStatus(consent), decidedAt: decidedAt };
            },
        },
    ),
);
