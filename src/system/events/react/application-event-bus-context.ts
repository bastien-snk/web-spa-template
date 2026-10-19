import { createContext } from 'react';

import type { ApplicationEventBus } from '@/system/events/application-event-bus.ts';

export const ApplicationEventBusContext = createContext<ApplicationEventBus | null>(null);
