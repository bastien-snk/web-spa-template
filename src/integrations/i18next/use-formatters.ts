import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { formatMoney } from '@/integrations/i18next/formatters/format-money';
import { formatNumber } from '@/integrations/i18next/formatters/format-number';
import { formatPercent } from '@/integrations/i18next/formatters/format-percent';
import { formatPlural } from '@/integrations/i18next/formatters/format-plural';
import { formatDuration } from '@/integrations/i18next/formatters/format-duration';
import { formatDateTime } from '@/integrations/i18next/formatters/format-date-time';
import { formatRelativeTime } from '@/integrations/i18next/formatters/format-relative-time';
import { formatTime } from '@/integrations/i18next/formatters/format-time';

export function useFormatters() {
    const i18n = useTranslation();
    const locale = i18n.i18n.resolvedLanguage ?? i18n.i18n.language ?? 'en';

    return {
        formatDateTime: useCallback((value: string) => formatDateTime(value, locale), [locale]),
        formatDuration: useCallback((value: number) => formatDuration(value, locale), [locale]),
        formatMoney: useCallback((money: Parameters<typeof formatMoney>[0]) => formatMoney(money, locale), [locale]),
        formatNumber: useCallback((value: string) => formatNumber(value, locale), [locale]),
        formatPercent: useCallback((value: string) => formatPercent(value, locale), [locale]),
        formatPlural: useCallback((value: number) => formatPlural(value, locale), [locale]),
        formatRelativeTime: useCallback((value: string) => formatRelativeTime(value, locale), [locale]),
        formatTime: useCallback((value: string) => formatTime(value, locale), [locale]),
    };
}
