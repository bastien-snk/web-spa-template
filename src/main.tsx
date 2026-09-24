import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from '@tanstack/react-router';
import { init as initApi } from '@/integrations/api';
import { init as initI18next } from '@/integrations/i18next';
import { init as initTanstackQuery } from '@/integrations/tanstack-query';
import { createAppRouter } from '@/router';
import { TooltipProvider } from '@/shared/ui/shadcn/tooltip';
import { AppToaster } from '@/shared/ui/app/toast/AppToaster';
import './index.css';

await initI18next();
initApi();
const queryClient = initTanstackQuery();
const router = createAppRouter(queryClient);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <TooltipProvider delayDuration={150}>
                <RouterProvider router={router} />
                <AppToaster />
            </TooltipProvider>
        </QueryClientProvider>
    </StrictMode>,
);
