export function formatDuration(value: number, locale: string): string {
    const totalSeconds = Math.max(0, Math.round(value / 1_000));
    const days = Math.floor(totalSeconds / 86_400);
    const hours = Math.floor((totalSeconds % 86_400) / 3_600);
    const minutes = Math.floor((totalSeconds % 3_600) / 60);
    const seconds = totalSeconds % 60;
    const parts: string[] = [];

    if (days > 0) parts.push(formatUnit(days, 'day', locale));
    if (hours > 0) parts.push(formatUnit(hours, 'hour', locale));
    if (minutes > 0) parts.push(formatUnit(minutes, 'minute', locale));
    if (days === 0 && hours === 0 && seconds > 0) parts.push(formatUnit(seconds, 'second', locale));
    if (parts.length === 0) return formatUnit(0, 'second', locale);

    return new Intl.ListFormat(locale, { style: 'narrow', type: 'unit' }).format(parts.slice(0, 2));
}

function formatUnit(value: number, unit: Intl.NumberFormatOptions['unit'], locale: string): string {
    return new Intl.NumberFormat(locale, { style: 'unit', unit: unit, unitDisplay: 'short' }).format(value);
}
