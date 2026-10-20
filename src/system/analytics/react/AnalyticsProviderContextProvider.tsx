import type { ReactNode } from 'react';

import type { AnalyticsProvider } from '@/system/analytics/analytics-provider';
import { AnalyticsProviderContext } from '@/system/analytics/react/analytics-provider-context';

type AnalyticsProviderContextProviderProps = {
    analytics: AnalyticsProvider;
    children: ReactNode;
};

export function AnalyticsProviderContextProvider(props: AnalyticsProviderContextProviderProps) {
    return (
        <AnalyticsProviderContext.Provider value={props.analytics}>{props.children}</AnalyticsProviderContext.Provider>
    );
}
