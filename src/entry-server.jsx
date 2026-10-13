import { renderToString } from 'react-dom/server';
import App from './App.jsx';
import { t } from './utils/i18n.js';
import { SEO_CONTENT } from './utils/seoContent.js';

export function render(locale) {
  return renderToString(<App initialLocale={locale} initialTranslation={{ messages: t[locale], content: SEO_CONTENT[locale] }} />);
}
