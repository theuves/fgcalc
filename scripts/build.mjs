import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { build, loadEnv } from 'vite';
import { SUPPORTED_LOCALES } from '../src/utils/i18n.js';
import { SEO_CONTENT } from '../src/utils/seoContent.js';
import { DEFAULT_SITE_URL, escapeHtml, normalizeSiteUrl, renderSeoHead } from '../src/utils/seo.js';

const env = { ...loadEnv('production', process.cwd(), 'VITE_'), ...process.env };
const siteUrl = normalizeSiteUrl(env.VITE_SITE_URL || DEFAULT_SITE_URL);
const serverDir = resolve('.prerender');

try {
  await build();
  await build({
    build: { ssr: 'src/entry-server.jsx', outDir: serverDir, emptyOutDir: true },
  });
  const { render } = await import(pathToFileURL(resolve(serverDir, 'entry-server.js')).href);
  const template = await readFile('dist/index.html', 'utf8');
  if (!template.includes('<!--seo-head-->') || !template.includes('<!--app-html-->')) {
    throw new Error('Static rendering placeholders are missing from index.html.');
  }
  const renderPage = (locale) => template
    .replace('<html lang="pt-BR">', `<html lang="${SEO_CONTENT[locale].language}">`)
    .replace('data-locale="pt"', `data-locale="${locale}"`)
    .replace('<!--seo-head-->', () => renderSeoHead(locale, siteUrl))
    .replace('<!--app-html-->', () => render(locale));

  for (const locale of SUPPORTED_LOCALES) {
    await mkdir(`dist/${locale}`, { recursive: true });
    await writeFile(`dist/${locale}/index.html`, renderPage(locale));
  }
  // Preserve the existing browser-language selection at / after hydration.
  // The deterministic Portuguese HTML is canonicalized to /pt.
  await writeFile('dist/index.html', renderPage('pt'));

  const alternates = [...SUPPORTED_LOCALES, 'x-default'].map((locale) =>
    `    <xhtml:link rel="alternate" hreflang="${locale}" href="${escapeHtml(siteUrl)}/${locale === 'x-default' ? 'pt' : locale}" />`
  ).join('\n');
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${SUPPORTED_LOCALES.map((locale) => `  <url>\n    <loc>${escapeHtml(siteUrl)}/${locale}</loc>\n${alternates}\n  </url>`).join('\n')}
</urlset>
`;
  await writeFile('dist/sitemap.xml', sitemap);
  await writeFile('dist/robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`);
  await writeFile('dist/404.html', `<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="robots" content="noindex, follow" /><title>Página não encontrada | Fidalgo</title>
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<style>body{margin:0;padding:48px 24px;background:#f4f7fa;color:#102b46;font:18px/1.6 Arial,sans-serif}main{max-width:680px;margin:10vh auto}a{color:#4c64b5}nav{display:flex;gap:24px;flex-wrap:wrap}</style></head>
<body><main><h1>Página não encontrada / Page not found</h1><p>Escolha o idioma da calculadora / Choose your calculator language:</p>
<nav aria-label="Idiomas / Languages"><a href="/pt" lang="pt-BR">Português</a><a href="/en" lang="en">English</a><a href="/es" lang="es">Español</a></nav></main></body></html>`);
  console.log(`Static SEO pages generated for ${SUPPORTED_LOCALES.join(', ')} at ${siteUrl}`);
} finally {
  await rm(serverDir, { recursive: true, force: true });
}
