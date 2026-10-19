import type { AnalyticsDelivery } from '@/system/analytics/analytics-delivery';

export interface AnalyticsProvider {
    capture(eventName: string, properties: Record<string, unknown>, delivery?: AnalyticsDelivery): void;
    identify(distinctId: string): void;
    enable(): void;
    disable(): void;
    reset(): void;
}
