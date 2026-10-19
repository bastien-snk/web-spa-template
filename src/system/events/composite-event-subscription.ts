import { EventSubscription } from '@/system/events/event-subscription';

export class CompositeEventSubscription extends EventSubscription {
    constructor(private readonly subscriptions: EventSubscription[]) {
        super();
        this.subscribe();
    }

    protected onSubscribe(): void {
        for (const subscription of this.subscriptions) {
            subscription.subscribe();
        }
    }

    protected onUnsubscribe(): void {
        for (const subscription of this.subscriptions) {
            subscription.unsubscribe();
        }
    }
}
