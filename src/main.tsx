import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from '@tanstack/react-router';
import { init as initApi } from '@/integrations/api';
import { init as initI18next } from '@/integrations/i18next';
import { init as initPostHog } from '@/integrations/posthog';
import { init as initTanstackQuery } from '@/integrations/tanstack-query';
import { ApplicationEventBusProvider } from '@/system/events/react/ApplicationEventBusProvider';
import { InMemoryEventBus } from '@/system/events/in-memory-event-bus';
import { PersistentAnalyticsConsentReader } from '@/system/analytics/consent/persistent-analytics-consent-reader';
import { useAnalyticsConsentStore } from '@/system/analytics/consent/analytics-consent-store';
import { ConsentAwareAnalyticsProvider } from '@/system/analytics/consent-aware-analytics-provider';
import { PostHogAnalyticsProvider } from '@/system/analytics/posthog-analytics-provider';
import { getEffectiveAnalyticsConsentStatus } from '@/system/analytics/consent/services/get-effective-analytics-consent-status';
import { createAppRouter } from '@/router';
import { TooltipProvider } from '@/shared/ui/shadcn/tooltip';
import { AppToaster } from '@/shared/ui/app/toast/AppToaster';
import './index.css';

await initI18next({
    language: 'en',
    fallbackLanguage: 'en',
    supportedLanguages: ['en', 'fr'],
});
initApi();
initPostHog();
const applicationEventBus = new InMemoryEventBus();
const analyticsProvider = new ConsentAwareAnalyticsProvider(
    new PostHogAnalyticsProvider(),
    new PersistentAnalyticsConsentReader(),
);
useAnalyticsConsentStore.subscribe((state) => {
    if (getEffectiveAnalyticsConsentStatus({ status: state.status, decidedAt: state.decidedAt }) !== 'accepted') {
        analyticsProvider.disable();
    }
});
const queryClient = initTanstackQuery();
const router = createAppRouter(queryClient);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <TooltipProvider delayDuration={150}>
                <ApplicationEventBusProvider eventBus={applicationEventBus}>
                    <RouterProvider router={router} />
                </ApplicationEventBusProvider>
                <AppToaster />
            </TooltipProvider>
        </QueryClientProvider>
    </StrictMode>,
);
