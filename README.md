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
