import { SEO_CONTENT } from './seoContent.js';
import { getSeo as createSeo, renderSeoHead as createSeoHead, SITE_URL } from './seoMetadata.js';
export { DEFAULT_SITE_URL, SITE_URL, escapeHtml, normalizeSiteUrl, serializeJsonLd } from './seoMetadata.js';

export const getSeo = (locale, siteUrl = SITE_URL) => createSeo(locale, siteUrl, SEO_CONTENT[locale] || SEO_CONTENT.pt);
export const renderSeoHead = (locale, siteUrl = SITE_URL) => createSeoHead(locale, siteUrl, SEO_CONTENT[locale] || SEO_CONTENT.pt);
