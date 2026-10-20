import { useContext } from 'react';

import type { AnalyticsProvider } from '@/system/analytics/analytics-provider';
import { AnalyticsProviderContext } from '@/system/analytics/react/analytics-provider-context';

export function useAnalyticsProvider(): AnalyticsProvider {
    const analytics = useContext(AnalyticsProviderContext);
    if (analytics === null) throw new Error('AnalyticsProviderContextProvider is missing');

    return analytics;
}
