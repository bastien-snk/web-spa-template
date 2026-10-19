import type { AnalyticsConsentReader } from '@/system/analytics/analytics-consent-reader';
import type { AnalyticsDelivery } from '@/system/analytics/analytics-delivery';
import type { AnalyticsProvider } from '@/system/analytics/analytics-provider';

export class ConsentAwareAnalyticsProvider implements AnalyticsProvider {
    constructor(
        private readonly provider: AnalyticsProvider,
        private readonly consent: AnalyticsConsentReader,
    ) {}

    capture(eventName: string, properties: Record<string, unknown>, delivery?: AnalyticsDelivery): void {
        if (!this.consent.isAccepted()) {
            this.provider.disable();
            return;
        }

        this.provider.enable();
        this.provider.capture(eventName, properties, delivery);
    }

    identify(distinctId: string): void {
        if (!this.consent.isAccepted()) {
            this.provider.disable();
            return;
        }

        this.provider.enable();
        this.provider.identify(distinctId);
    }

    enable(): void {
        if (!this.consent.isAccepted()) {
            this.provider.disable();
            return;
        }

        this.provider.enable();
    }

    disable(): void {
        this.provider.disable();
    }

    reset(): void {
        this.provider.reset();
    }
}
