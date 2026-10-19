import { useContext } from 'react';

import { ApplicationEventBusContext } from '@/system/events/react/application-event-bus-context.ts';
import type { ApplicationEventBus } from '@/system/events/application-event-bus.ts';

export function useApplicationEventBus(): ApplicationEventBus {
    const eventBus = useContext(ApplicationEventBusContext);
    if (eventBus === null) throw new Error('ApplicationEventBusProvider is missing');

    return eventBus;
}
