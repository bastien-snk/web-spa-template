import { formatNumber } from '@/integrations/i18next/formatters/format-number';

export function formatPercent(value: string, locale: string): string {
    const percentage = shiftDecimal(value, 2);
    if (percentage === null) return value;

    const number = formatNumber(percentage, locale, { maximumFractionDigits: 2 });
    const formatter = new Intl.NumberFormat(locale, { style: 'percent' });
    const parts = formatter.formatToParts(0);
    const firstNumericPart = parts.findIndex((part) => isNumericPart(part.type));
    const lastNumericPart = parts.findLastIndex((part) => isNumericPart(part.type));
    if (firstNumericPart === -1 || lastNumericPart === -1) return `${number}%`;

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

function shiftDecimal(value: string, places: number): string | null {
    const match = value.match(/^(-)?(\d+)(?:\.(\d+))?$/);
    if (match === null) return null;

    const sign = match[1] ?? '';
    const integer = match[2];
    const fraction = match[3] ?? '';
    const digits = `${integer}${fraction}`.padEnd(integer.length + places, '0');
    const decimalIndex = integer.length + places;
    const whole = digits.slice(0, decimalIndex).replace(/^0+(?=\d)/, '') || '0';
    const decimal = digits.slice(decimalIndex);

    return `${sign}${whole}${decimal.length > 0 ? `.${decimal}` : ''}`;
}

function isNumericPart(type: Intl.NumberFormatPartTypes): boolean {
    return type === 'integer' || type === 'group' || type === 'decimal' || type === 'fraction';
}
