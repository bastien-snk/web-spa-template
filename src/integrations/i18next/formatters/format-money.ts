import { formatNumber } from '@/integrations/i18next/formatters/format-number';

type Money = {
    amount: string;
    currency: string;
};

type FormatMoneyOptions = {
    currencyDisplay?: 'code' | 'narrowSymbol' | 'symbol';
    maximumFractionDigits?: number;
    minimumFractionDigits?: number;
};

export function formatMoney(money: Money, locale: string, options: FormatMoneyOptions = {}): string {
    const currencyDisplay = options.currencyDisplay ?? 'narrowSymbol';
    const isNegative = money.amount.startsWith('-') && !isZero(money.amount);
    const currencyFormatter = createCurrencyFormatter(locale, money.currency, currencyDisplay);
    const number = formatNumber(isNegative ? money.amount.slice(1) : money.amount, locale, {
        maximumFractionDigits: options.maximumFractionDigits,
        minimumFractionDigits:
            options.minimumFractionDigits ?? resolveMinimumFractionDigits(money.amount, currencyFormatter),
    });
    if (currencyFormatter === null) return `${number} ${money.currency}`;

    const parts = currencyFormatter.formatToParts(isNegative ? -1 : 0);
    const firstNumericPart = parts.findIndex((part) => isNumericPart(part.type));
    const lastNumericPart = parts.findLastIndex((part) => isNumericPart(part.type));
    if (firstNumericPart === -1 || lastNumericPart === -1) return `${number} ${money.currency}`;

    const prefix = parts
        .slice(0, firstNumericPart)
        .map((part) => part.value)
        .join('');
    const suffix = parts
        .slice(lastNumericPart + 1)
        .map((part) => part.value)
        .join('');

    return `${prefix}${number}${suffix}`;
}

function isZero(value: string): boolean {
    return /^-?0(?:\.0+)?$/.test(value);
}

function resolveMinimumFractionDigits(value: string, formatter: Intl.NumberFormat | null): number {
    if (!/^-?\d+\.\d+$/.test(value)) return 0;

    return formatter?.resolvedOptions().minimumFractionDigits ?? 0;
}

function createCurrencyFormatter(
    locale: string,
    currency: string,
    currencyDisplay: NonNullable<FormatMoneyOptions['currencyDisplay']>,
): Intl.NumberFormat | null {
    try {
        return new Intl.NumberFormat(locale, {
            currency: currency,
            currencyDisplay: currencyDisplay,
            style: 'currency',
        });
    } catch {
        return null;
    }
}

function isNumericPart(type: Intl.NumberFormatPartTypes): boolean {
    return type === 'integer' || type === 'group' || type === 'decimal' || type === 'fraction';
}
