import { calculateLightsail } from './lightsail.js';
import regions from './data.js';
import { POPULAR_CURRENCIES } from './currencies.js';
import { CPU_VALUES, getMemoryValues } from './fargateResources.js';

const regionCodes = new Set(regions.map(({ region }) => region));
const currencyCodes = new Set(POPULAR_CURRENCIES.slice(0, 10));
const timeUnits = new Set(['hour', 'day', 'month', 'year']);
export const SHARE_QUERY_KEYS = ['region', 'currency', 'cpu', 'memory', 'duration', 'unit', 'fargate', 'spot', 'service', 'plan', 'nodes', 'months'];

export const DEFAULT_ESTIMATE = {
  region: 'us-east-1',
  currency: 'USD',
  cpu: 1,
  ram: 2,
  timeValue: 1,
  timeType: 'month',
  capacityFargate: 1,
  capacityFargateSpot: 0,
};

const parseInteger = (raw, minimum, fallback) => {
  if (raw === null || !/^\d+$/.test(raw)) return fallback;
  const value = Number(raw);
  return Number.isSafeInteger(value) && value >= minimum ? value : fallback;
};

export function readSharedEstimate(search) {
  const params = new URLSearchParams(search);
  const cpu = Number(params.get('cpu'));
  const validCpu = CPU_VALUES.includes(cpu) ? cpu : DEFAULT_ESTIMATE.cpu;
  const ram = Number(params.get('memory'));

  if (params.get('service') === 'lightsail') {
    const lightsail = { service: 'lightsail', plan: params.get('plan'), nodes: parseInteger(params.get('nodes'), 1, 1), months: parseInteger(params.get('months'), 1, 1), currency: currencyCodes.has(params.get('currency')) ? params.get('currency') : 'USD' };
    return { ...DEFAULT_ESTIMATE, ...lightsail, ...(calculateLightsail(lightsail) ? {} : { plan: 'nano', nodes: 1, months: 1 }) };
  }
  return {
    region: regionCodes.has(params.get('region')) ? params.get('region') : DEFAULT_ESTIMATE.region,
    currency: currencyCodes.has(params.get('currency')) ? params.get('currency') : DEFAULT_ESTIMATE.currency,
    cpu: validCpu,
    ram: getMemoryValues(validCpu).includes(ram) ? ram : getMemoryValues(validCpu)[0],
    timeValue: parseInteger(params.get('duration'), 1, DEFAULT_ESTIMATE.timeValue),
    timeType: timeUnits.has(params.get('unit')) ? params.get('unit') : DEFAULT_ESTIMATE.timeType,
    capacityFargate: parseInteger(params.get('fargate'), 0, DEFAULT_ESTIMATE.capacityFargate),
    capacityFargateSpot: parseInteger(params.get('spot'), 0, DEFAULT_ESTIMATE.capacityFargateSpot),
  };
}

export function isShareableEstimate(estimate) {
  if (estimate.service === 'lightsail') return currencyCodes.has(estimate.currency) && calculateLightsail(estimate) !== null;
  return regionCodes.has(estimate.region)
    && currencyCodes.has(estimate.currency)
    && CPU_VALUES.includes(estimate.cpu)
    && getMemoryValues(estimate.cpu).includes(estimate.ram)
    && Number.isSafeInteger(estimate.timeValue) && estimate.timeValue >= 1
    && timeUnits.has(estimate.timeType)
    && Number.isSafeInteger(estimate.capacityFargate) && estimate.capacityFargate >= 0
    && Number.isSafeInteger(estimate.capacityFargateSpot) && estimate.capacityFargateSpot >= 0;
}

export function buildShareUrl(baseUrl, locale, estimate) {
  if (!isShareableEstimate(estimate)) throw new Error('Invalid estimate');
  const url = new URL(baseUrl);
  url.pathname = `/${locale}`;
  url.search = '';
  url.hash = '';
  if (estimate.service === 'lightsail') {
    for (const key of ['service', 'plan', 'nodes', 'months', 'currency']) url.searchParams.set(key, String(estimate[key]));
    return url.toString();
  }
  url.searchParams.set('region', estimate.region);
  url.searchParams.set('currency', estimate.currency);
  url.searchParams.set('cpu', String(estimate.cpu));
  url.searchParams.set('memory', String(estimate.ram));
  url.searchParams.set('duration', String(estimate.timeValue));
  url.searchParams.set('unit', estimate.timeType);
  url.searchParams.set('fargate', String(estimate.capacityFargate));
  url.searchParams.set('spot', String(estimate.capacityFargateSpot));
  return url.toString();
}
