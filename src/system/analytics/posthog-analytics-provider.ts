import posthog from 'posthog-js';

import { AnalyticsDelivery } from '@/system/analytics/analytics-delivery';
import type { AnalyticsProvider } from '@/system/analytics/analytics-provider';

export class PostHogAnalyticsProvider implements AnalyticsProvider {
    private isEnabled = false;

    capture(
        eventName: string,
        properties: Record<string, unknown>,
        delivery: AnalyticsDelivery = AnalyticsDelivery.DEFAULT,
    ): void {
        if (!posthog.__loaded || !this.isEnabled) return;

        if (delivery === AnalyticsDelivery.IMMEDIATE) {
            posthog.capture(eventName, properties, { send_instantly: true, transport: 'sendBeacon' });
            return;
        }

        posthog.capture(eventName, properties);
    }

    identify(distinctId: string): void {
        if (!posthog.__loaded || !this.isEnabled) return;

        posthog.identify(distinctId);
    }

    enable(): void {
        if (this.isEnabled || !posthog.__loaded) return;

        posthog.opt_in_capturing();
        this.isEnabled = true;
    }

    disable(): void {
        if (!posthog.__loaded || !this.isEnabled) return;

        posthog.opt_out_capturing();
        this.isEnabled = false;
    }

    reset(): void {
        if (!posthog.__loaded) return;

        this.disable();
        posthog.reset();
    }
}
