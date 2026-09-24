const RELATIVE_TIME_THRESHOLD_MS = 7 * 24 * 60 * 60 * 1_000;

export function formatRelativeTime(value: string, locale: string, now = Date.now()): string {
    const timestamp = Date.parse(value);
    if (Number.isNaN(timestamp)) return value;

    const difference = timestamp - now;
    if (Math.abs(difference) >= RELATIVE_TIME_THRESHOLD_MS) {
        return new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'short', year: 'numeric' }).format(timestamp);
    }

    const unit = getUnit(difference);
    const amount = Math.round(difference / unit.milliseconds);

    return new Intl.RelativeTimeFormat(locale, { numeric: 'auto' }).format(amount, unit.value);
}

function getUnit(value: number): { milliseconds: number; value: Intl.RelativeTimeFormatUnit } {
    const absoluteValue = Math.abs(value);
    if (absoluteValue < 60_000) return { milliseconds: 1_000, value: 'second' };
    if (absoluteValue < 3_600_000) return { milliseconds: 60_000, value: 'minute' };
    if (absoluteValue < 86_400_000) return { milliseconds: 3_600_000, value: 'hour' };

    return { milliseconds: 86_400_000, value: 'day' };
}
