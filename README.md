# fgcalc

AWS Fargate pricing calculator with a minimal, utility-first interface.

Estimate costs for Fargate and Fargate Spot quickly using region, vCPU, memory, task count and period.

## What it is

- Serverless-style cost calculator for AWS Fargate workloads.
- No cards, low-noise layout, and fast parameter changes.
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

1. Set region and currency.
2. Configure time, CPU, memory, Fargate tasks, and Fargate Spot tasks.
3. Read total estimate and breakdown instantly.

## Data sources

- Fargate price values are stored in `src/utils/data.js` from public AWS pricing references.
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
