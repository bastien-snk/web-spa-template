import type { ApplicationEvent } from '@/system/events/application-event';
import type { ApplicationEventBus } from '@/system/events/application-event-bus';
import type { EventHandler } from '@/system/events/event-handler';
import { EventBusSubscription } from '@/system/events/event-bus-subscription';
import type { EventSubscription } from '@/system/events/event-subscription';

export class InMemoryEventBus implements ApplicationEventBus {
    private readonly subscriptionsByEventType = new Map<string, Set<EventBusSubscription<ApplicationEvent>>>();

    publish<Event extends ApplicationEvent>(event: Event): void {
        const subscriptions = this.subscriptionsByEventType.get(event.type);
        if (!subscriptions) return;

        for (const subscription of subscriptions) {
            try {
                subscription.dispatch(event);
            } catch (error) {
                console.error(`Application event handler failed for "${event.type}"`, error);
            }
        }
    }

    subscribe<Event extends ApplicationEvent>(
        eventType: Event['type'],
        handler: EventHandler<Event>,
    ): EventSubscription {
        let subscriptions = this.subscriptionsByEventType.get(eventType);

        if (!subscriptions) {
            subscriptions = new Set<EventBusSubscription<ApplicationEvent>>();
            this.subscriptionsByEventType.set(eventType, subscriptions);
        }

        const subscription = new EventBusSubscription(handler, subscriptions);

        subscription.subscribe();

        return subscription;
    }
}
