import { SUPPORTED_LOCALES } from './i18n.js';
import { SEO_CONTENT } from './seoContent.js';

export const DEFAULT_SITE_URL = 'https://fargate.fidalgoitsolutions.com.br';
export const SITE_URL = normalizeSiteUrl(import.meta.env?.VITE_SITE_URL || DEFAULT_SITE_URL);

export function normalizeSiteUrl(value) {
  const url = new URL(value);
  if (!['http:', 'https:'].includes(url.protocol) || url.pathname !== '/' || url.search || url.hash || url.username || url.password) {
    throw new Error('VITE_SITE_URL must be an absolute http(s) origin without a path, query, credentials, or fragment.');
  }
  return url.origin;
}

export const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[character]);

export const serializeJsonLd = (value) => JSON.stringify(value).replace(/</g, '\\u003c');

export function getSeo(locale, siteUrl = SITE_URL) {
  const content = SEO_CONTENT[locale] || SEO_CONTENT.pt;
  const code = SEO_CONTENT[locale] ? locale : 'pt';
  const origin = normalizeSiteUrl(siteUrl);
  const canonical = `${origin}/${code}`;
  const image = `${origin}/og-${code}.png`;
  const organizationId = `${origin}/#organization`;
  const websiteId = `${origin}/#website`;
  const applicationId = `${canonical}#application`;
  const alternates = SUPPORTED_LOCALES.map((language) => ({ language, href: `${origin}/${language}` }));
  alternates.push({ language: 'x-default', href: `${origin}/pt` });
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization', '@id': organizationId,
        name: 'Fidalgo IT Solutions', url: 'https://www.fidalgoitsolutions.com.br',
        logo: `${origin}/favicon.svg`,
        sameAs: ['https://linkedin.com/company/fidalgoitsolutions', 'https://github.com/fidalgoitsolutions', 'https://www.instagram.com/fidalgoitsolutions'],
      },
      {
        '@type': 'WebSite', '@id': websiteId, url: `${origin}/`,
        name: 'AWS Fargate Calculator', inLanguage: ['pt-BR', 'en', 'es'],
        publisher: { '@id': organizationId },
      },
      {
        '@type': 'WebApplication', '@id': applicationId,
        name: content.heading, url: canonical, description: content.description,
        applicationCategory: 'BusinessApplication', operatingSystem: 'Any',
        browserRequirements: 'Requires JavaScript for interactive estimates.',
        inLanguage: content.language, image,
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        publisher: { '@id': organizationId }, isAccessibleForFree: true,
      },
      {
        '@type': ['WebPage', 'FAQPage'], '@id': `${canonical}#webpage`,
        url: canonical, name: content.title, description: content.description,
        inLanguage: content.language, isPartOf: { '@id': websiteId },
        about: { '@id': applicationId }, publisher: { '@id': organizationId },
        primaryImageOfPage: { '@type': 'ImageObject', url: image, width: 1200, height: 630 },
        mainEntity: content.faq.map(({ question, answer }) => ({
          '@type': 'Question', name: question,
          acceptedAnswer: { '@type': 'Answer', text: answer },
        })),
      },
    ],
  };
  return { ...content, canonical, image, alternates, structuredData };
}

export function renderSeoHead(locale, siteUrl = SITE_URL) {
  const seo = getSeo(locale, siteUrl);
  const meta = (attribute, name, content) => `<meta ${attribute}="${name}" content="${escapeHtml(content)}" />`;
  return [
    `<title>${escapeHtml(seo.title)}</title>`,
    meta('name', 'description', seo.description),
    meta('name', 'robots', 'index, follow, max-image-preview:large'),
    `<link rel="canonical" href="${escapeHtml(seo.canonical)}" />`,
    ...seo.alternates.map(({ language, href }) => `<link rel="alternate" hreflang="${language}" href="${escapeHtml(href)}" />`),
    meta('property', 'og:type', 'website'),
    meta('property', 'og:site_name', 'AWS Fargate Calculator · Fidalgo'),
    meta('property', 'og:title', seo.title), meta('property', 'og:description', seo.description),
    meta('property', 'og:url', seo.canonical), meta('property', 'og:locale', seo.ogLocale),
    ...SUPPORTED_LOCALES.filter((code) => code !== locale).map((code) => meta('property', 'og:locale:alternate', SEO_CONTENT[code].ogLocale)),
    meta('property', 'og:image', seo.image), meta('property', 'og:image:width', '1200'),
    meta('property', 'og:image:height', '630'), meta('property', 'og:image:type', 'image/png'),
    meta('property', 'og:image:alt', seo.imageAlt),
    meta('name', 'twitter:card', 'summary_large_image'), meta('name', 'twitter:title', seo.title),
    meta('name', 'twitter:description', seo.description), meta('name', 'twitter:image', seo.image),
    meta('name', 'twitter:image:alt', seo.imageAlt),
    `<script id="structured-data" type="application/ld+json">${serializeJsonLd(seo.structuredData)}</script>`,
  ].join('\n    ');
}

export function updateSeo(locale) {
  const seo = getSeo(locale);
  document.documentElement.lang = seo.language;
  document.title = seo.title;
  const updateMeta = (attribute, name, content) => {
    let element = document.head.querySelector(`meta[${attribute}="${name}"]`);
    if (!element) {
      element = document.createElement('meta');
      element.setAttribute(attribute, name);
      document.head.appendChild(element);
    }
    element.content = content;
  };
  updateMeta('name', 'description', seo.description);
  for (const [name, content] of Object.entries({ title: seo.title, description: seo.description, url: seo.canonical, locale: seo.ogLocale, image: seo.image, 'image:alt': seo.imageAlt })) {
    updateMeta('property', `og:${name}`, content);
  }
  for (const [name, content] of Object.entries({ title: seo.title, description: seo.description, image: seo.image, 'image:alt': seo.imageAlt })) {
    updateMeta('name', `twitter:${name}`, content);
  }
  document.head.querySelectorAll('meta[property="og:locale:alternate"]').forEach((element) => element.remove());
  SUPPORTED_LOCALES.filter((code) => code !== locale).forEach((code) => {
    const element = document.createElement('meta');
    element.setAttribute('property', 'og:locale:alternate');
    element.content = SEO_CONTENT[code].ogLocale;
    document.head.appendChild(element);
  });
  let canonical = document.head.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.appendChild(canonical);
  }
  canonical.href = seo.canonical;
  let structuredData = document.getElementById('structured-data');
  if (!structuredData) {
    structuredData = document.createElement('script');
    structuredData.id = 'structured-data';
    structuredData.type = 'application/ld+json';
    document.head.appendChild(structuredData);
  }
  structuredData.textContent = serializeJsonLd(seo.structuredData);
}
