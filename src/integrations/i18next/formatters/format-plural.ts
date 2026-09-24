export function formatPlural(value: number, locale: string): Intl.LDMLPluralRule {
    return new Intl.PluralRules(locale).select(value);
}
