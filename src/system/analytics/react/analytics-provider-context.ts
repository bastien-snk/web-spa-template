import { createContext } from 'react';

import type { AnalyticsProvider } from '@/system/analytics/analytics-provider';

export const AnalyticsProviderContext = createContext<AnalyticsProvider | null>(null);
