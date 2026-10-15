import assert from 'node:assert/strict';
import test from 'node:test';
import { calculateLightsail } from '../src/utils/lightsail.js';
import { buildShareUrl, readSharedEstimate, isShareableEstimate } from '../src/utils/shareEstimate.js';

test('two Small nodes cost $30/month and convert the full period', () => {
  assert.deepEqual(calculateLightsail({ plan: 'small', nodes: 2, months: 3, exchangeRate: 5 }), { monthly: 150, total: 450 });
});

test('Lightsail rejects missing, fractional and out-of-range capacity and unavailable rates', () => {
  const valid = { plan: 'nano', nodes: 1, months: 1 };
  for (const override of [{ nodes: '' }, { nodes: 0 }, { nodes: 21 }, { nodes: 1.5 }, { months: 0 }, { months: '' }, { exchangeRate: NaN }, { exchangeRate: 0 }, { plan: 'invalid' }]) {
    assert.equal(calculateLightsail({ ...valid, ...override }), null);
  }
});

test('Lightsail shared estimates restore service, plan, nodes, months and currency', () => {
  const estimate = { service: 'lightsail', plan: 'medium', nodes: 3, months: 12, currency: 'BRL' };
  const url = new URL(buildShareUrl('https://example.com/pt?cpu=2', 'en', estimate));
  assert.equal(url.pathname, '/en');
  assert.equal(url.searchParams.has('cpu'), false);
  const restored = readSharedEstimate(url.search);
  for (const key of Object.keys(estimate)) assert.equal(restored[key], estimate[key]);
  assert.equal(isShareableEstimate(restored), true);
});

test('legacy Fargate links retain their configuration', () => {
  const original = readSharedEstimate('?cpu=2&memory=4&fargate=3&spot=2');
  assert.deepEqual(readSharedEstimate(new URL(buildShareUrl('https://example.com', 'pt', original)).search), original);
});
