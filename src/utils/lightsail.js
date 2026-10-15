// AWS public monthly prices per node, checked 2026-10-14.
// https://aws.amazon.com/lightsail/pricing/#Containers
export const LIGHTSAIL_PLANS = [
  { id: 'nano', name: 'Nano', cpu: 0.25, ram: 0.5, monthly: 7, shared: true },
  { id: 'micro', name: 'Micro', cpu: 0.25, ram: 1, monthly: 10, shared: true },
  { id: 'small', name: 'Small', cpu: 0.5, ram: 1, monthly: 15, shared: true },
  { id: 'medium', name: 'Medium', cpu: 1, ram: 2, monthly: 40 },
  { id: 'large', name: 'Large', cpu: 2, ram: 4, monthly: 80 },
  { id: 'xlarge', name: 'XLarge', cpu: 4, ram: 8, monthly: 160 },
];

export function calculateLightsail({ plan, nodes, months, exchangeRate = 1 }) {
  const selected = LIGHTSAIL_PLANS.find(({ id }) => id === plan);
  if (!selected || !Number.isSafeInteger(nodes) || nodes < 1 || nodes > 20
    || !Number.isSafeInteger(months) || months < 1
    || !Number.isFinite(exchangeRate) || exchangeRate <= 0) return null;
  const monthly = selected.monthly * nodes * exchangeRate;
  const total = monthly * months;
  return Number.isFinite(total) ? { monthly, total } : null;
}
