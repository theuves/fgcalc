import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { SUPPORTED_LOCALES } from '../src/utils/i18n.js';
import { SEO_CONTENT } from '../src/utils/seoContent.js';
import { getSeo, normalizeSiteUrl, serializeJsonLd } from '../src/utils/seo.js';
import getPrices from '../src/utils/createPriceGetter.js';

const htmlByLocale = new Map();
for (const locale of SUPPORTED_LOCALES) {
  htmlByLocale.set(locale, await readFile(`dist/${locale}/index.html`, 'utf8'));
}
const siteUrl = htmlByLocale.get('pt').match(/<link rel="canonical" href="([^"]+)\/pt"/)[1];

for (const locale of SUPPORTED_LOCALES) {
  test(`${locale}: complete, localized HTML is available without JavaScript`, () => {
    const html = htmlByLocale.get(locale);
    const content = SEO_CONTENT[locale];
    assert.ok(html.includes(`<html lang="${content.language}">`));
    assert.ok(html.includes(`data-locale="${locale}"`));
    assert.equal((html.match(/<h1\b/g) || []).length, 1);
    assert.ok(html.includes(content.heading));
    assert.ok(html.includes(content.guideTitle));
    for (const { question, answer } of content.faq) {
      assert.ok(html.includes(question));
      assert.ok(html.includes(answer));
    }
    assert.ok(!html.includes('<!--app-html-->'));
    assert.ok(!html.includes('<!--seo-head-->'));
  });

  test(`${locale}: canonical, social metadata, and reciprocal language links are correct`, async () => {
    const html = htmlByLocale.get(locale);
    const seo = getSeo(locale, siteUrl);
    assert.equal((html.match(/rel="canonical"/g) || []).length, 1);
    assert.ok(html.includes(`rel="canonical" href="${siteUrl}/${locale}"`));
    assert.equal((html.match(/<title>/g) || []).length, 1);
    assert.equal((html.match(/name="description"/g) || []).length, 1);
    for (const { language, href } of seo.alternates) {
      assert.ok(html.includes(`hreflang="${language}" href="${href}"`));
    }
    for (const language of SUPPORTED_LOCALES) {
      assert.ok(html.includes(`href="/${language}" hrefLang="${language}"`));
    }
    assert.ok(html.includes('name="twitter:card" content="summary_large_image"'));
    assert.ok(html.includes(`property="og:url" content="${seo.canonical}"`));
    assert.ok(html.includes(`property="og:image" content="${seo.image}"`));
    const png = await readFile(`dist/og-${locale}.png`);
    assert.equal(png.subarray(1, 4).toString(), 'PNG');
    assert.equal(png.readUInt32BE(16), 1200);
    assert.equal(png.readUInt32BE(20), 630);
  });

  test(`${locale}: structured FAQ matches the visible content`, () => {
    const html = htmlByLocale.get(locale);
    const data = JSON.parse(html.match(/<script id="structured-data" type="application\/ld\+json">(.*?)<\/script>/s)[1]);
    const page = data['@graph'].find((entity) => Array.isArray(entity['@type']) && entity['@type'].includes('FAQPage'));
    assert.equal(page.url, `${siteUrl}/${locale}`);
    assert.equal(page.inLanguage, SEO_CONTENT[locale].language);
    assert.equal(page.mainEntity.length, SEO_CONTENT[locale].faq.length);
    for (const question of page.mainEntity) {
      assert.ok(html.includes(question.name));
      assert.ok(html.includes(question.acceptedAnswer.text));
    }
  });
}

test('robots and sitemap expose only clean, canonical language pages', async () => {
  const robots = await readFile('dist/robots.txt', 'utf8');
  const sitemap = await readFile('dist/sitemap.xml', 'utf8');
  assert.ok(robots.includes('Allow: /'));
  assert.ok(robots.includes(`Sitemap: ${siteUrl}/sitemap.xml`));
  assert.equal((sitemap.match(/<loc>/g) || []).length, 3);
  assert.equal((sitemap.match(/hreflang="x-default"/g) || []).length, 3);
  for (const locale of SUPPORTED_LOCALES) assert.ok(sitemap.includes(`<loc>${siteUrl}/${locale}</loc>`));
  for (const [, url] of sitemap.matchAll(/<loc>(.*?)<\/loc>/g)) assert.equal(new URL(url).search, '');
});

test('the root canonicalizes to Portuguese and 404 is not indexable', async () => {
  const root = await readFile('dist/index.html', 'utf8');
  assert.equal(root, htmlByLocale.get('pt'));
  const notFound = await readFile('dist/404.html', 'utf8');
  assert.ok(notFound.includes('content="noindex, follow"'));
  const config = JSON.parse(await readFile('vercel.json', 'utf8'));
  assert.equal(config.trailingSlash, false);
  assert.deepEqual(config.rewrites.map(({ source }) => source).sort(), ['/en', '/es', '/pt']);
});

test('the documented monthly example agrees with calculator pricing', () => {
  const estimate = getPrices({ region: 'us-east-1', cpu: 1, ram: 2, time: { value: 1, type: 'month' }, exchangeRate: 1 })(1, 'FARGATE');
  assert.equal(estimate.total.toFixed(2), '36.04');
});

test('production origins are validated and JSON-LD cannot close its script tag', () => {
  assert.equal(normalizeSiteUrl('https://calculator.example/'), 'https://calculator.example');
  for (const invalid of ['javascript:alert(1)', 'https://calculator.example/path', 'https://calculator.example/?secret=1', 'https://user:password@calculator.example']) {
    assert.throws(() => normalizeSiteUrl(invalid));
  }
  const data = { text: '</script><script>alert(1)</script>' };
  assert.ok(!serializeJsonLd(data).includes('</script>'));
  assert.deepEqual(JSON.parse(serializeJsonLd(data)), data);
});
