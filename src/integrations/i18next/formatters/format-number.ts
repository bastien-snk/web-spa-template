type FormatNumberOptions = {
    maximumFractionDigits?: number;
    minimumFractionDigits?: number;
};

export function formatNumber(value: string, locale: string, options: FormatNumberOptions = {}): string {
    const parsed = parseDecimal(value);
    if (parsed === null) return value;

    const fraction = formatFraction(parsed.fraction, options);
    const integer = groupInteger(parsed.integer, locale);
    const decimal = resolveDecimalSeparator(locale);
    const sign = parsed.isNegative ? resolveMinusSign(locale) : '';

    return `${sign}${integer}${fraction.length > 0 ? `${decimal}${fraction}` : ''}`;
}

type Decimal = {
    fraction: string;
    integer: string;
    isNegative: boolean;
};

function parseDecimal(value: string): Decimal | null {
    const match = value.match(/^(-)?(\d+)(?:\.(\d+))?$/);
    if (match === null) return null;

    return {
        fraction: match[3] ?? '',
        integer: match[2],
        isNegative: match[1] === '-' && value !== '-0',
    };
}

function formatFraction(fraction: string, options: FormatNumberOptions): string {
    const maximum = options.maximumFractionDigits;
    const minimum = options.minimumFractionDigits ?? 0;
    const limited = maximum === undefined ? fraction : fraction.slice(0, maximum);
    const trimmed = limited.replace(/0+$/, '');

    return trimmed.padEnd(minimum, '0');
}

function groupInteger(integer: string, locale: string): string {
    const formatter = new Intl.NumberFormat(locale, { maximumFractionDigits: 0 });

    try {
        return formatter.format(BigInt(integer));
    } catch {
        return integer;
    }
}

function resolveDecimalSeparator(locale: string): string {
    return new Intl.NumberFormat(locale).formatToParts(1.1).find((part) => part.type === 'decimal')?.value ?? '.';
}

function resolveMinusSign(locale: string): string {
    return new Intl.NumberFormat(locale).formatToParts(-1).find((part) => part.type === 'minusSign')?.value ?? '-';
}
