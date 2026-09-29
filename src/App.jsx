import React, { useState, useEffect, useMemo, useId, useRef } from 'react';
import Header from './components/Header/Header';
import BrandMark from './components/BrandMark';
import ArrowUpRight from './components/ArrowUpRight';
import RegionInput from './components/Header/RegionInput';
import CurrencyInput from './components/Header/CurrencyInput';
import TimeInput from './components/TimeInput';
import CPUInput from './components/CPUInput';
import RAMInput from './components/RAMInput';
import CapacityInput from './components/CapacityInput';
import Table from './components/Table';
import ShareEstimate from './components/ShareEstimate';
import createPriceGetter from './utils/createPriceGetter';
import formatPrice from './utils/formatPrice';
import getExchangeRates from './utils/getExchangeRates';
import { POPULAR_CURRENCIES } from './utils/currencies';
import { buildShareUrl, isShareableEstimate, readSharedEstimate, SHARE_QUERY_KEYS } from './utils/shareEstimate';
import { t as localeStrings, getLocaleFromPath, SUPPORTED_LOCALES } from './utils/i18n';

function App() {
  const [initialEstimate] = useState(() => readSharedEstimate(window.location.search));
  const [region, setRegion] = useState(initialEstimate.region);
  const [currency, setCurrency] = useState(initialEstimate.currency);
  const [locale, setLocale] = useState(() => getLocaleFromPath(window.location.pathname));
  const [cpu, setCpu] = useState(initialEstimate.cpu);
  const [ram, setRam] = useState(initialEstimate.ram);
  const handleCpuChange = (nextCpu) => {
    setCpu(nextCpu);
    const minimum = nextCpu === 0.25 ? 0.5 : nextCpu === 0.5 ? 1 : nextCpu * 2;
    const maximum = nextCpu === 0.25 ? 2 : nextCpu === 0.5 ? 4 : nextCpu === 4 ? 30 : nextCpu * 8;
    setRam((current) => Math.min(maximum, Math.max(minimum, current)));
  };
  const [timeValue, setTimeValue] = useState(initialEstimate.timeValue);
  const [timeType, setTimeType] = useState(initialEstimate.timeType);
  const [capacityFargate, setCapacityFargate] = useState(initialEstimate.capacityFargate);
  const [capacityFargateSpot, setCapacityFargateSpot] = useState(initialEstimate.capacityFargateSpot);
  const isSharedSession = useRef(SHARE_QUERY_KEYS.some((key) => new URLSearchParams(window.location.search).has(key)));
  const [currencyRates, setCurrencyRates] = useState({ USD: 1 });
  const [isLoadingRates, setIsLoadingRates] = useState(true);
  const messages = useMemo(() => localeStrings[SUPPORTED_LOCALES.includes(locale) ? locale : 'pt'], [locale]);

  useEffect(() => {
    if (!isSharedSession.current) return;
    const estimate = { region, currency, cpu, ram, timeValue, timeType, capacityFargate, capacityFargateSpot };
    if (isShareableEstimate(estimate)) {
      window.history.replaceState({}, '', buildShareUrl(window.location.href, locale, estimate));
    } else {
      const url = new URL(window.location.href);
      SHARE_QUERY_KEYS.forEach((key) => url.searchParams.delete(key));
      window.history.replaceState({}, '', url);
    }
  }, [region, currency, cpu, ram, timeValue, timeType, capacityFargate, capacityFargateSpot, locale]);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.title = messages.documentTitle;
  }, [locale, messages]);

  useEffect(() => {
    const onPopState = () => setLocale(getLocaleFromPath(window.location.pathname));
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const changeLocale = (nextLocale) => {
    if (!SUPPORTED_LOCALES.includes(nextLocale) || nextLocale === locale) return;
    const url = new URL(window.location.href);
    url.pathname = `/${nextLocale}`;
    window.history.pushState({}, '', url);
    setLocale(nextLocale);
  };

  useEffect(() => {
    const updateCurrencyRates = async () => {
      setIsLoadingRates(true);
      try {
        const rates = await getExchangeRates();
        if (rates) setCurrencyRates(rates);
      } catch (error) {
        console.error('Failed to update exchange rates:', error);
      } finally {
        setIsLoadingRates(false);
      }
    };
    updateCurrencyRates();
    const intervalId = setInterval(updateCurrencyRates, 60000);
    return () => clearInterval(intervalId);
  }, []);

  const prices = useMemo(() => {
    if ([capacityFargate, capacityFargateSpot, timeValue, cpu, ram].some((value) => !Number.isFinite(value))
      || capacityFargate < 0 || capacityFargateSpot < 0 || timeValue < 1
      || !Number.isFinite(currencyRates[currency]) || currencyRates[currency] <= 0) {
      return null;
    }
    const getPrices = createPriceGetter({
      region,
      time: { value: timeValue, type: timeType },
      exchangeRate: currencyRates[currency],
      cpu,
      ram,
    });
    const fargatePrice = getPrices(capacityFargate, 'FARGATE');
    const fargateSpotPrice = getPrices(capacityFargateSpot, 'FARGATE_SPOT');
    return { total: fargatePrice.total + fargateSpotPrice.total, fargatePrice, fargateSpotPrice };
  }, [region, cpu, ram, timeValue, timeType, capacityFargate, capacityFargateSpot, currency, currencyRates]);

  const availableCurrencies = useMemo(() => {
    const allCurrencies = Object.keys(currencyRates);
    return POPULAR_CURRENCIES.slice(0, 10).filter((code) => code === currency || allCurrencies.includes(code));
  }, [currencyRates, currency]);

  const timeValueId = useId();
  const timeTypeId = useId();
  const cpuId = useId();
  const ramId = useId();
  const regionId = useId();
  const currencyId = useId();
  const fargateTasksId = useId();
  const fargateSpotTasksId = useId();
  const ui = messages.ui;
  const companyUrl = `https://www.fidalgoitsolutions.com.br/${locale === 'pt' ? 'pt' : 'en'}`;
  const awsPricingUrl = locale === 'pt'
    ? 'https://aws.amazon.com/pt/fargate/pricing/'
    : locale === 'es'
      ? 'https://aws.amazon.com/es/fargate/pricing/'
      : 'https://aws.amazon.com/fargate/pricing/';

  return (
    <div className="app-shell">
      <a href="#calculator" className="skip-link">{messages.skipToCalculator}</a>
      <Header locale={locale} t={messages} onLocaleChange={changeLocale} />

      <main id="calculator" className="workspace">
        <section className="calculator-intro" aria-labelledby="calculator-intro-title">
          <h2 id="calculator-intro-title">{ui.calculatorIntroTitle}</h2>
          <p>{ui.calculatorIntroText}</p>
        </section>

        <div className="calculator-card">
          <section className="calculator-form" aria-labelledby="config-title">
            <div className="panel-heading">
              <div className="panel-heading-copy">
                <span className="panel-step">01 / {ui.stepConfiguration}</span>
                <h2 id="config-title">{messages.sections.configuration}</h2>
              </div>
            </div>

            <div className="field-group">
              <div className="field-group-heading"><span>{ui.infrastructure}</span><span className="field-group-line" /></div>
              <div className="field-grid field-grid-two">
                <div className="field"><label className="field-label" htmlFor={regionId}>{messages.selectors.regionLabel}</label><RegionInput id={regionId} value={region} onChange={setRegion} t={messages} /></div>
                <div className="field"><label className="field-label" htmlFor={currencyId}>{messages.selectors.currencyLabel}</label><CurrencyInput id={currencyId} value={currency} onChange={setCurrency} currencyList={availableCurrencies} t={messages} locale={locale} /></div>
              </div>
              {isLoadingRates && <p className="field-note" role="status">{messages.header.updatingRates}</p>}
              {!isLoadingRates && (!Number.isFinite(currencyRates[currency]) || currencyRates[currency] <= 0) && <p className="field-note" role="status">{messages.header.ratesUnavailable}</p>}
            </div>

            <div className="field-group">
              <div className="field-group-heading"><span>{ui.resources}</span><span className="field-group-line" /></div>
              <div className="field-grid field-grid-two">
                <div className="field"><label className="field-label" htmlFor={cpuId}>{messages.sections.cpu}</label><CPUInput value={cpu} onChange={handleCpuChange} id={cpuId} ariaLabel={messages.sections.cpuAria} /></div>
                <div className="field"><label className="field-label" htmlFor={ramId}>{messages.sections.memory}</label><RAMInput cpu={cpu} value={ram} onChange={setRam} id={ramId} ariaLabel={messages.sections.memoryAria} /></div>
              </div>
            </div>

            <div className="field-group">
              <div className="field-group-heading"><span>{ui.workload}</span><span className="field-group-line" /></div>
              <div className="field"><label className="field-label" htmlFor={timeValueId}>{messages.sections.timePeriod}</label><TimeInput valueInputId={timeValueId} typeInputId={timeTypeId} value={timeValue} type={timeType} onValueChange={setTimeValue} onTypeChange={setTimeType} valueAriaLabel={messages.sections.timeInputValueAria} typeAriaLabel={messages.sections.timeInputUnitAria} helperText={messages.sections.timeInputHelp} timeUnits={messages.sections.timeUnits} /></div>
              <div className="field-grid field-grid-two task-fields">
                <div className="field"><label className="field-label" htmlFor={fargateTasksId}>{messages.sections.fargateTasks}</label><CapacityInput ariaLabel={messages.sections.fargateTasksAria} id={fargateTasksId} value={capacityFargate} onChange={setCapacityFargate} /></div>
                <div className="field"><label className="field-label" htmlFor={fargateSpotTasksId}>{messages.sections.fargateSpotTasks}</label><CapacityInput ariaLabel={messages.sections.fargateSpotTasksAria} id={fargateSpotTasksId} value={capacityFargateSpot} onChange={setCapacityFargateSpot} /><p className="field-note">{messages.sections.fargateSpotScope}</p></div>
              </div>
            </div>
          </section>

          <section className="calculator-results" aria-labelledby="result-title">
            <div className="panel-heading results-heading">
              <div className="panel-heading-copy">
                <span className="panel-step">02 / {ui.stepEstimate}</span>
                <h2 id="result-title">{messages.sections.estimatedCost}</h2>
              </div>
              <ShareEstimate
                estimate={{ region, currency, cpu, ram, timeValue, timeType, capacityFargate, capacityFargateSpot }}
                locale={locale}
                total={prices ? formatPrice(prices.total, currency, locale) : '—'}
                messages={messages}
              />
            </div>
            <div className="total-card">
              <svg className="total-chart" viewBox="0 0 520 220" preserveAspectRatio="none" aria-hidden="true" focusable="false">
                <defs>
                  <linearGradient id="total-chart-fill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#7c9cff" stopOpacity="0.32" />
                    <stop offset="100%" stopColor="#7c9cff" stopOpacity="0.02" />
                  </linearGradient>
                </defs>
                <g className="total-chart-grid">
                  <path d="M170 52H520 M170 100H520 M170 148H520 M170 196H520" />
                  <path d="M245 28V220 M337 28V220 M429 28V220" />
                </g>
                <path className="total-chart-area" d="M170 185 C200 168 208 176 235 151 S281 145 306 118 S347 130 374 98 S414 103 442 73 S481 82 520 33 L520 220 H170 Z" fill="url(#total-chart-fill)" />
                <path className="total-chart-line" d="M170 185 C200 168 208 176 235 151 S281 145 306 118 S347 130 374 98 S414 103 442 73 S481 82 520 33" />
                <circle className="total-chart-point" cx="520" cy="33" r="4" />
              </svg>
              <span className="total-label">{messages.sections.totalCost}</span>
              <div className="total-value" role="status" aria-live="polite">{prices ? formatPrice(prices.total, currency, locale) : '—'}</div>
              <p>{ui.totalCaption}</p>
            </div>
            <div className="breakdown-heading"><h3>{ui.breakdown}</h3><span>{currency}</span></div>
            <div className="breakdown-stack">
              <Table name={messages.sections.table.fargate} currency={currency} locale={locale} cpu={prices?.fargatePrice.cpu} ram={prices?.fargatePrice.ram} total={prices?.fargatePrice.total} cpuLabel={messages.sections.table.vcpuLabel} ramLabel={messages.sections.table.gibsLabel} />
              <Table name={messages.sections.table.fargateSpot} currency={currency} locale={locale} cpu={prices?.fargateSpotPrice.cpu} ram={prices?.fargateSpotPrice.ram} total={prices?.fargateSpotPrice.total} cpuLabel={messages.sections.table.vcpuLabel} ramLabel={messages.sections.table.gibsLabel} />
            </div>
            <div className="pricing-note"><span aria-hidden="true">ⓘ</span><p>{messages.sections.pricingUpdate} {ui.pricingCaution}</p></div>
          </section>
        </div>

        <section className="education-section" aria-labelledby="education-title">
          <div className="education-heading">
            <div>
              <span className="section-eyebrow">{ui.education.eyebrow}</span>
              <h2 id="education-title">{ui.education.title}</h2>
              <p>{ui.education.intro}</p>
            </div>
            <a href={awsPricingUrl} target="_blank" rel="noopener noreferrer" className="education-source">
              {ui.education.source} <ArrowUpRight />
            </a>
          </div>
          <div className="education-grid">
            {ui.education.cards.map((card, index) => (
              <article className="education-card" key={card.title}>
                <span className="education-card-number">0{index + 1}</span>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <section className="company-cta" aria-labelledby="company-cta-title">
        <div className="company-cta-inner">
          <div className="company-cta-copy">
            <span className="section-eyebrow">{ui.prefooter.eyebrow}</span>
            <h2 id="company-cta-title">{ui.prefooter.title}</h2>
            <p>{ui.prefooter.text}</p>
          </div>
          <div className="company-cta-actions">
            <a className="company-cta-primary" href="mailto:contato@fidalgoitsolutions.com.br">{ui.prefooter.cta}<ArrowUpRight /></a>
            <a className="company-cta-secondary" href={`${companyUrl}#atuacao`} target="_blank" rel="noopener noreferrer">{ui.prefooter.secondary}<ArrowUpRight /></a>
          </div>
        </div>
      </section>

      <footer className="company-footer">
        <div className="company-footer-inner">
          <div className="footer-overview">
            <a className="footer-brand" href={companyUrl} target="_blank" rel="noopener noreferrer">
              <BrandMark className="footer-brand-mark" />
              <span>Fidalgo IT Solutions</span>
            </a>
            <strong>{ui.siteFooter.tagline}</strong>
            <p>{ui.siteFooter.description}</p>
            <a className="footer-email" href="mailto:contato@fidalgoitsolutions.com.br">contato@fidalgoitsolutions.com.br</a>
          </div>
          <nav className="footer-links" aria-label={ui.siteFooter.navigationLabel}>
            <div className="footer-column">
              <h3>{ui.siteFooter.appTitle}</h3>
              <a href="#calculator">{ui.siteFooter.calculator}</a>
              <a href={awsPricingUrl} target="_blank" rel="noopener noreferrer">{ui.siteFooter.awsPrices}</a>
              <a href="https://github.com/theuves/fgcalc" target="_blank" rel="noopener noreferrer">{ui.siteFooter.source}</a>
            </div>
            <div className="footer-column">
              <h3>{ui.siteFooter.companyTitle}</h3>
              <a href={`${companyUrl}#atuacao`} target="_blank" rel="noopener noreferrer">{ui.siteFooter.services}</a>
              <a href={`${companyUrl}/blog`} target="_blank" rel="noopener noreferrer">{ui.siteFooter.blog}</a>
              <a href="mailto:contato@fidalgoitsolutions.com.br">{ui.siteFooter.contact}</a>
            </div>
            <div className="footer-column">
              <h3>{ui.siteFooter.socialTitle}</h3>
              <a href="https://linkedin.com/company/fidalgoitsolutions" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href="https://github.com/fidalgoitsolutions" target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href="https://www.instagram.com/fidalgoitsolutions" target="_blank" rel="noopener noreferrer">Instagram</a>
            </div>
          </nav>
        </div>
        <div className="footer-bottom">
          <div className="footer-bottom-inner">
            <span>© 2026 Fidalgo IT Solutions. {ui.siteFooter.rights}</span>
            <div className="footer-legal">
              <span>Fidalgo Tecnologia da Informacao LTDA</span>
              <span>Belo Horizonte - MG</span>
              <span>CNPJ 49.627.083/0001-32</span>
            </div>
          </div>
          <p>{ui.siteFooter.disclaimer}</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
