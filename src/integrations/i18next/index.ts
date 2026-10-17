import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

type TranslationResource = Record<string, unknown>;

export type I18nextInitOptions = {
    language: string;
    fallbackLanguage: string;
    supportedLanguages: readonly string[];
};

const translationModules = import.meta.glob<TranslationResource>('./locales/*/**/*.json', {
    eager: true,
    import: 'default',
});

function discoverResources() {
    const resources: Record<string, Record<string, TranslationResource>> = {};

    for (const [path, translation] of Object.entries(translationModules)) {
        const match = path.match(/^\.\/locales\/([^/]+)\/(.+)\.json$/);
        if (!match) continue;

        const [, language, namespace] = match;
        resources[language] ??= {};
        resources[language][namespace] = translation;
    }

    return resources;
}

export async function init(options: I18nextInitOptions) {
    await i18n.use(initReactI18next).init({
        resources: discoverResources(),
        lng: options.language,
        fallbackLng: options.fallbackLanguage,
        supportedLngs: options.supportedLanguages,
        interpolation: { escapeValue: false },
    });
}
