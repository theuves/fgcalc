# fgcalc

AWS Fargate pricing calculator with a Fidalgo IT Solutions interface.

Estimate costs for Fargate and Fargate Spot quickly using region, vCPU, memory, task count and period.

## What it is

- Serverless-style cost calculator for AWS Fargate workloads.
- Responsive calculator with fast parameter changes and a cost breakdown.
- Built for practical daily use, not visual decoration.

## Tech

- React 19
- Vite
- Tailwind CSS

## Run locally

```bash
npm install
npm run dev
```

## How to use

The home URL selects Portuguese, English, or Spanish from the browser language preferences. An explicit `/pt`, `/en`, or `/es` URL takes precedence, and the language selector lets visitors change it.

1. Set region and currency.
2. Configure time, CPU, memory, Fargate tasks, and Fargate Spot tasks.
3. Read total estimate and breakdown instantly.
4. Use **Share** to copy a URL that restores the selected configuration. The total is recalculated when the link opens, so exchange rates and Fargate Spot prices may produce a different amount.

## Data sources

- `src/utils/data.js` contains USD rates per vCPU-hour and GB-hour for Linux/x86 Fargate. Fargate Spot estimates apply to Amazon ECS tasks. The 22 on-demand regional rates were checked against the [AWS AmazonECS Price List Bulk API](https://pricing.us-east-1.amazonaws.com/offers/v1.0/aws/AmazonECS/current/region_index.json) on September 29, 2026; all matched. The offer was published September 11, 2026.
- Fargate Spot rates were checked against the [price feed used by the official AWS Fargate pricing page](https://dftu77xade0tc.cloudfront.net/fargate-spot-prices.json) on September 29, 2026 at 21:41 UTC. The feed was last modified at 21:37:30 UTC. Sixteen of the 22 regional Spot rates changed. [AWS notes that Spot prices vary over time](https://aws.amazon.com/fargate/pricing/), so these are a snapshot for estimates.
- The estimate covers vCPU and memory only. Additional storage, data transfer, logs, and other services can add charges. A month is modeled as 730 hours and a year as 8,760 hours.
- Exchange rates are pulled from `open.er-api.com` at runtime (`src/utils/getExchangeRates.js`).

## SEO and production build

`npm run build` generates the interactive client plus complete, prerendered HTML for `/pt`, `/en`, and `/es`. Content, headings, guide, and FAQ are readable without JavaScript; React hydrates the calculator in the browser. Shared estimate URLs restore their parameters with a fresh client render.

- Each language has a translated title, description, canonical URL, reciprocal `hreflang` links, Open Graph tags, and Twitter card. Query parameters canonicalize to the clean language URL.
- Structured data describes the publisher, website, free web application, and visible FAQ. FAQ markup does not guarantee a Google rich result.
- `dist/robots.txt` and `dist/sitemap.xml` are generated from the same production origin. The sitemap contains the three canonical language pages; `/` serves Portuguese HTML canonicalized to `/pt` and selects the browser language after hydration.
- Vercel serves each language's static HTML and returns a real 404 for unknown routes. `npm run preview` uses the same language paths and a 404 page locally.
- Social images are localized 1200 × 630 PNGs in `public/`. Editable SVG sources live in `assets/social/`; regenerate them with `node scripts/social-images.mjs`, then export each SVG as its corresponding `public/og-{locale}.png` at its original dimensions.
- Language flags are served locally from `public/flags/` (original assets from FlagCDN).

The default production origin is `https://fargate.fidalgoitsolutions.com.br`. To change it, set `VITE_SITE_URL` before building (see `.env.example`). Use an absolute origin with no subdirectory or query. Deploy the generated `dist/` directory; running `vite build` directly skips prerendering and sitemap generation. Vercel's build command is explicitly configured to use `npm run build`.

Validate changes with:

```bash
npm run build
npm run test:seo
npm run lint
npm run preview
```

After publishing, submit `/sitemap.xml` in Google Search Console and inspect `/pt`, `/en`, and `/es` to verify indexing. Search Console ownership verification requires the domain owner's account; this repository does not add a fabricated verification token. Rankings and rich results depend on search engines and are not guaranteed by these changes.

## Data and brand note

This project is independent and not affiliated with Amazon, AWS, or any brand names used for context.

## Project info

- `src/components` → UI components
- `src/utils` → pricing, currency conversion and formatting logic
- `src/App.jsx` → page flow and layout

## License

MIT

## Contact

Fidalgo IT Solutions · https://fidalgoitsolutions.com.br
