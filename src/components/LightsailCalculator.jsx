import { useId } from 'react';
import ComboSelect from './ComboSelect';
import CurrencyInput from './Header/CurrencyInput';
import CapacityInput from './CapacityInput';
import ShareEstimate from './ShareEstimate';
import formatPrice from '../utils/formatPrice';
import { calculateLightsail, LIGHTSAIL_PLANS } from '../utils/lightsail';

export default function LightsailCalculator({ estimate, onChange, currency, onCurrencyChange, currencyList, currencyRates, isLoadingRates, locale, messages }) {
  const id = useId();
  const t = messages.lightsail;
  const plan = LIGHTSAIL_PLANS.find(({ id }) => id === estimate.plan);
  const prices = calculateLightsail({ ...estimate, exchangeRate: currencyRates[currency] ?? NaN });
  const shared = { ...estimate, service: 'lightsail', currency };
  const shareMessages = { ...messages, ui: { ...messages.ui, share: { ...messages.ui.share, note: t.shareNote } } };
  const update = (key, value) => onChange({ ...estimate, [key]: value });
  const price = (value) => Number.isFinite(value) ? formatPrice(value, currency, locale) : '—';

  return <>
    <div className="calculator-card">
      <section className="calculator-form" aria-labelledby={`${id}-config`}>
        <div className="panel-heading"><div className="panel-heading-copy"><span className="panel-step">01 / {messages.ui.stepConfiguration}</span><h2 id={`${id}-config`}>{messages.sections.configuration}</h2></div></div>
        <div className="field-group">
          <div className="field"><label className="field-label" htmlFor={`${id}-currency`}>{messages.selectors.currencyLabel}</label><CurrencyInput id={`${id}-currency`} value={currency} onChange={onCurrencyChange} currencyList={currencyList} t={messages} locale={locale} /></div>
          <p className="field-note exchange-rate-status" role="status">{isLoadingRates ? messages.header.updatingRates : !Number.isFinite(currencyRates[currency]) ? messages.header.ratesUnavailable : ''}</p>
        </div>
        <div className="field-group">
          <div className="field"><label className="field-label" htmlFor={`${id}-plan`}>{t.plan}</label><ComboSelect id={`${id}-plan`} ariaLabel={t.plan} value={estimate.plan} onChange={(value) => update('plan', value)} options={LIGHTSAIL_PLANS.map((p) => ({ value: p.id, label: `${p.name} · ${p.cpu} vCPU · ${p.ram} GB · US$ ${p.monthly}/${messages.sections.timeUnits.month.singular}` }))} /></div>
          <p className="field-note">{t.resources}: {plan.cpu} vCPU · {plan.ram} GB{plan.shared ? ` · ${t.shared}` : ''}</p>
        </div>
        <div className="field-group field-grid field-grid-two">
          <div className="field"><label className="field-label" htmlFor={`${id}-nodes`}>{t.nodes} (1–20)</label><CapacityInput id={`${id}-nodes`} value={estimate.nodes} onChange={(value) => update('nodes', value)} ariaLabel={t.nodes} /></div>
          <div className="field"><label className="field-label" htmlFor={`${id}-months`}>{t.months}</label><CapacityInput id={`${id}-months`} value={estimate.months} onChange={(value) => update('months', value)} ariaLabel={t.months} /></div>
        </div>
        <p className="field-note">{t.billing}</p>
      </section>
      <section className="calculator-results" aria-labelledby={`${id}-result`}>
        <div className="panel-heading results-heading"><div className="panel-heading-copy"><span className="panel-step">02 / {messages.ui.stepEstimate}</span><h2 id={`${id}-result`}>{messages.sections.estimatedCost}</h2></div><ShareEstimate estimate={shared} locale={locale} total={price(prices?.total)} messages={shareMessages} /></div>
        <div className="total-card"><span className="total-label">{messages.sections.totalCost}</span><div className="total-value" role="status" aria-live="polite">{price(prices?.total)}</div><p>{messages.ui.totalCaption}</p></div>
        <div className="breakdown-heading"><h3>{messages.ui.breakdown}</h3><span>{currency}</span></div>
        <div className="breakdown-card"><div className="breakdown-card-top"><strong>{t.monthly}</strong><span>{price(prices?.monthly)}</span></div><div className="breakdown-card-body"><span>{plan.name} · {estimate.nodes || '—'} × {price(plan.monthly * currencyRates[currency])}</span></div></div>
        <div className="pricing-note"><span aria-hidden="true">ⓘ</span><p>{t.quota}</p></div>
        <div className="pricing-note"><span aria-hidden="true">ⓘ</span><p>{t.limits}</p></div>
      </section>
    </div>
    <section className="calculator-intro lightsail-explanation"><h2>Lightsail Containers</h2><p>{t.formula}</p><a href="https://aws.amazon.com/lightsail/pricing/#Containers" target="_blank" rel="noopener noreferrer">{messages.ui.education.source}</a></section>
  </>;
}
