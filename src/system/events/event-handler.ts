import type { ApplicationEvent } from '@/system/events/application-event';

export interface EventHandler<Event extends ApplicationEvent> {
    handle(event: Event): void;
}
