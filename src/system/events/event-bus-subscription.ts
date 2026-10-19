import { EventSubscription } from '@/system/events/event-subscription';
import type { ApplicationEvent } from '@/system/events/application-event';
import type { EventHandler } from '@/system/events/event-handler';

export class EventBusSubscription<Event extends ApplicationEvent> extends EventSubscription {
    constructor(
        private readonly handler: EventHandler<Event>,
        private readonly subscriptions: Set<EventBusSubscription<ApplicationEvent>>,
    ) {
        super();
    }

    dispatch(event: ApplicationEvent): void {
        this.handler.handle(event as Event);
    }

    protected onSubscribe(): void {
        this.subscriptions.add(this as EventBusSubscription<ApplicationEvent>);
    }

    protected onUnsubscribe(): void {
        this.subscriptions.delete(this as EventBusSubscription<ApplicationEvent>);
    }
}
