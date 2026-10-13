export const SUPPORTED_LOCALES = ['en', 'pt', 'es'];

export const LOCALE_LABELS = {
  en: 'English',
  pt: 'Português',
  es: 'Español',
};

export const getLocaleFromPath = (path, preferredLanguages = []) => {
  const firstSegment = path?.replace(/\/$/, '').split('/').filter(Boolean)[0] || '';
  if (SUPPORTED_LOCALES.includes(firstSegment)) return firstSegment;

  const languages = Array.isArray(preferredLanguages) ? preferredLanguages : [preferredLanguages];
  for (const language of languages) {
    const code = typeof language === 'string' ? language.toLowerCase().split(/[-_]/)[0] : '';
    if (SUPPORTED_LOCALES.includes(code)) return code;
  }

  return 'pt';
};

const loaders = {
  en: () => import('../locales/en.js'),
  pt: () => import('../locales/pt.js'),
  es: () => import('../locales/es.js'),
};

export const loadLocale = (locale) => loaders[SUPPORTED_LOCALES.includes(locale) ? locale : 'pt']();
export const LOCALE_META = {
  en: { language: 'en', ogLocale: 'en_US' },
  pt: { language: 'pt-BR', ogLocale: 'pt_BR' },
  es: { language: 'es', ogLocale: 'es_ES' },
};
