import type { ReactNode } from 'react';

import { ApplicationEventBusContext } from '@/system/events/react/application-event-bus-context.ts';
import type { ApplicationEventBus } from '@/system/events/application-event-bus.ts';

type ApplicationEventBusProviderProps = {
    eventBus: ApplicationEventBus;
    children: ReactNode;
};

export function ApplicationEventBusProvider(props: ApplicationEventBusProviderProps) {
    return (
        <ApplicationEventBusContext.Provider value={props.eventBus}>
            {props.children}
        </ApplicationEventBusContext.Provider>
    );
}
