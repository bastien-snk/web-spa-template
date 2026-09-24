export function formatTime(value: string, locale: string): string {
    return new Intl.DateTimeFormat(locale, {
        hour: '2-digit',
        minute: '2-digit',
    }).format(new Date(value));
}
