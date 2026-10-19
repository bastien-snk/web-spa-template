import type { ApplicationEvent } from '@/system/events/application-event';
import type { EventHandler } from '@/system/events/event-handler';
import type { EventSubscription } from '@/system/events/event-subscription';

export interface ApplicationEventBus {
    publish<Event extends ApplicationEvent>(event: Event): void;

    subscribe<Event extends ApplicationEvent>(
        eventType: Event['type'],
        handler: EventHandler<Event>,
    ): EventSubscription;
}
