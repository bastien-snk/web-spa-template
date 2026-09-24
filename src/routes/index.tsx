import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

export const Route = createFileRoute('/')({
    component: HomePage,
});

function HomePage() {
    const { t } = useTranslation('app/home');

    return (
        <main className="grid min-h-dvh place-items-center p-6">
            <h1 className="text-2xl font-semibold tracking-tight">{t('heading')}</h1>
        </main>
    );
}
