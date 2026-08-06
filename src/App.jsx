import React, { useState, useEffect, useMemo, useId } from 'react';
import Header from './components/Header/Header';
import TimeInput from './components/TimeInput';
import CPUInput from './components/CPUInput';
import RAMInput from './components/RAMInput';
import CapacityInput from './components/CapacityInput';
import Table from './components/Table';
import createPriceGetter from './utils/createPriceGetter';
import formatPrice from './utils/formatPrice';
import getExchangeRates from './utils/getExchangeRates';
import { POPULAR_CURRENCIES } from './utils/currencies';
import { t as localeStrings, getLocaleFromPath, SUPPORTED_LOCALES } from './utils/i18n';

function getInitialLocale() {
  if (typeof window === 'undefined') {
    return 'en';
  }

  return getLocaleFromPath(window.location.pathname);
}

function App() {
  // Header inputs
  const [region, setRegion] = useState('us-east-1');
  const [currency, setCurrency] = useState('USD');
  const [locale, setLocale] = useState(getInitialLocale);

  // Form inputs
  const [cpu, setCpu] = useState(1);
  const [ram, setRam] = useState(2);
  const [timeValue, setTimeValue] = useState(1);
  const [timeType, setTimeType] = useState('month');
  const [capacityFargate, setCapacityFargate] = useState(1);
  const [capacityFargateSpot, setCapacityFargateSpot] = useState(0);

  // Currency rates state
  const [currencyRates, setCurrencyRates] = useState({ USD: 1 });
  const [isLoadingRates, setIsLoadingRates] = useState(true);

  // Prices state
  const [prices, setPrices] = useState({
    total: 0,
    fargatePrice: {
      total: 0,
      cpu: 0,
      ram: 0,
    },
    fargateSpotPrice: {
      total: 0,
      cpu: 0,
      ram: 0,
    },
  });

  const messages = useMemo(() => localeStrings[SUPPORTED_LOCALES.includes(locale) ? locale : 'en'], [locale]);

  useEffect(() => {
    if (typeof document !== 'undefined' && locale) {
      document.documentElement.lang = locale;
      document.title = messages?.documentTitle || 'AWS Fargate Calculator';
    }
  }, [locale, messages]);

  useEffect(() => {
    const onPopState = () => {
      setLocale(getLocaleFromPath(window.location.pathname));
    };

    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const changeLocale = (nextLocale) => {
    if (!SUPPORTED_LOCALES.includes(nextLocale) || nextLocale === locale) {
      return;
    }

    const targetPath = nextLocale === 'en' ? '/en' : `/${nextLocale}`;
    window.history.pushState({}, '', targetPath);
    setLocale(nextLocale);
  };

  // Fetch exchange rates on mount and update every minute
  useEffect(() => {
    /**
     * Fetches and updates currency exchange rates
     */
    const updateCurrencyRates = async () => {
      console.info('[INFO] Fetching exchange rates...');
      setIsLoadingRates(true);

      try {
        const rates = await getExchangeRates();
        if (rates) {
          setCurrencyRates(rates);
          console.info('[INFO] Exchange rates updated successfully.');
        } else {
          console.warn('[WARN] Exchange rates unavailable; keeping the last valid rates.');
        }
      } catch (error) {
        console.error('[ERROR] Failed to update exchange rates:', error);
      } finally {
        setIsLoadingRates(false);
      }
    };

    // Initial fetch
    updateCurrencyRates();

    // Update every minute (60000ms)
    const intervalId = setInterval(updateCurrencyRates, 60000);

    // Cleanup interval on unmount
    return () => clearInterval(intervalId);
  }, []);

  // Calculate prices whenever relevant values change
  useEffect(() => {
    // Validate inputs
    const numericInputs = [capacityFargate, capacityFargateSpot, timeValue, cpu, ram];
    if (
      numericInputs.some((value) => !Number.isFinite(value))
      || capacityFargate < 0
      || capacityFargateSpot < 0
      || timeValue < 1
    ) {
      return;
    }

    // Get exchange rate for selected currency
    const exchangeRate = currencyRates[currency] || 1;

    // Create price calculator function
    const getPrices = createPriceGetter({
      region,
      time: {
        value: timeValue,
        type: timeType,
      },
      exchangeRate,
      cpu,
      ram,
    });

    // Calculate prices for both Fargate types
    const fargatePrice = getPrices(capacityFargate, 'FARGATE');
    const fargateSpotPrice = getPrices(capacityFargateSpot, 'FARGATE_SPOT');

    // Update state
    setPrices({
      total: fargatePrice.total + fargateSpotPrice.total,
      fargatePrice,
      fargateSpotPrice,
    });
  }, [region, cpu, ram, timeValue, timeType, capacityFargate, capacityFargateSpot, currency, currencyRates]);

  // Keep the selector focused on the ten most relevant currencies.
  const availableCurrencies = useMemo(() => {
    const allCurrencies = Object.keys(currencyRates);
    return POPULAR_CURRENCIES
      .slice(0, 10)
      .filter((currencyCode) => allCurrencies.includes(currencyCode));
  }, [currencyRates]);

  const projectDescription = messages?.project || [];

  const timeValueId = useId();
  const timeTypeId = useId();
  const cpuId = useId();
  const ramId = useId();
  const fargateTasksId = useId();
  const fargateSpotTasksId = useId();

  return (
    <div className="min-h-screen bg-[var(--aws-bg)] text-[var(--aws-ink)]">
      <a
        href="#main-calculator"
        className="sr-only focus-visible:fixed focus-visible:top-3 focus-visible:left-3 focus-visible:z-50 focus-visible:p-3 focus-visible:bg-[#111827] focus-visible:text-white"
      >
        {messages?.skipToCalculator || 'Skip to calculator'}
      </a>

      <Header
        region={region}
        setRegion={setRegion}
        currency={currency}
        setCurrency={setCurrency}
        currencyList={availableCurrencies}
        isLoadingRates={isLoadingRates}
        locale={locale}
        t={messages}
        onLocaleChange={changeLocale}
      />

      <main id="main-calculator" className="max-w-5xl mx-auto px-3 sm:px-4 pb-6 sm:pb-8">
        <div className="bg-[var(--aws-surface)] border border-[var(--aws-border)]">
          <div className="grid md:grid-cols-2 gap-0">
            <section className="p-4 md:p-8 border-b md:border-b-0 md:border-r border-[var(--aws-border)]">
              <h2 className="text-xs sm:text-sm font-semibold uppercase tracking-[0.12em] text-[var(--aws-ink-soft)] mb-4 md:mb-5">
                {messages?.sections?.configuration || 'Configuration'}
              </h2>
              <form className="space-y-1">
                <div>
                  <label htmlFor={timeValueId} className="block text-xs sm:text-sm font-medium text-[var(--aws-ink-soft)] mb-2">
                    {messages?.sections?.timePeriod || 'Time period'}
                  </label>
                  <TimeInput
                    valueInputId={timeValueId}
                    typeInputId={timeTypeId}
                    value={timeValue}
                    type={timeType}
                    onValueChange={setTimeValue}
                    onTypeChange={setTimeType}
                    valueAriaLabel={messages?.sections?.timeInputValueAria || 'Time value'}
                    typeAriaLabel={messages?.sections?.timeInputUnitAria || 'Time unit'}
                    helperText={messages?.sections?.timeInputHelp || 'Type and then choose unit.'}
                    timeUnits={messages?.sections?.timeUnits}
                  />
                </div>

                <div>
                  <label htmlFor={cpuId} className="block text-xs sm:text-sm font-medium text-[var(--aws-ink-soft)] mb-2">
                    {messages?.sections?.cpu || 'CPU (vCPU)'}
                  </label>
                  <CPUInput value={cpu} onChange={setCpu} id={cpuId} ariaLabel={messages?.sections?.cpuAria || 'CPU value'} />
                </div>

                <div>
                  <label htmlFor={ramId} className="block text-xs sm:text-sm font-medium text-[var(--aws-ink-soft)] mb-2">
                    {messages?.sections?.memory || 'Memory (GiB)'}
                  </label>
                  <RAMInput cpu={cpu} value={ram} onChange={setRam} id={ramId} ariaLabel={messages?.sections?.memoryAria || 'Memory value in GiB'} />
                </div>

                <div>
                  <label htmlFor={fargateTasksId} className="block text-xs sm:text-sm font-medium text-[var(--aws-ink-soft)] mb-2">
                    {messages?.sections?.fargateTasks || 'Fargate Tasks'}
                  </label>
                  <CapacityInput
                    name={messages?.sections?.fargateTasks || 'Fargate Tasks'}
                    ariaLabel={messages?.sections?.fargateTasksAria || 'Number of Fargate tasks'}
                    id={fargateTasksId}
                    value={capacityFargate}
                    onChange={setCapacityFargate}
                  />
                </div>

                <div>
                  <label htmlFor={fargateSpotTasksId} className="block text-xs sm:text-sm font-medium text-[var(--aws-ink-soft)] mb-2">
                    {messages?.sections?.fargateSpotTasks || 'Fargate Spot Tasks'}
                  </label>
                  <CapacityInput
                    name={messages?.sections?.fargateSpotTasks || 'Fargate Spot Tasks'}
                    ariaLabel={messages?.sections?.fargateSpotTasksAria || 'Number of Fargate Spot tasks'}
                    id={fargateSpotTasksId}
                    value={capacityFargateSpot}
                    onChange={setCapacityFargateSpot}
                  />
                </div>
              </form>
            </section>

            <section className="p-4 md:p-8 bg-[var(--aws-surface)]">
              <h2 className="text-xs sm:text-sm font-semibold uppercase tracking-[0.12em] text-[var(--aws-ink-soft)] mb-4 md:mb-5">
                {messages?.sections?.estimatedCost || 'Estimated Cost'}
              </h2>
              <div className="text-center">
                <div className="mb-6 md:mb-8 p-4 sm:p-6 border border-[var(--aws-border)] bg-[var(--aws-accent-soft)]">
                  <p className="text-[10px] sm:text-xs text-[var(--aws-ink-soft)] mb-2 uppercase tracking-[0.12em]">
                    {messages?.sections?.totalCost || 'Total Cost'}
                  </p>
                  <h1
                    className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[var(--aws-ink)] font-mono break-all"
                    role="status"
                    aria-live="polite"
                  >
                    {formatPrice(prices.total, currency, locale)}
                  </h1>
                </div>

                <div className="space-y-4">
                  <Table
                    name={messages?.sections?.table?.fargate || 'Fargate'}
                    currency={currency}
                    locale={locale}
                    cpu={prices.fargatePrice.cpu}
                    ram={prices.fargatePrice.ram}
                    total={prices.fargatePrice.total}
                    cpuLabel={messages?.sections?.table?.vcpuLabel || 'vCPU'}
                    ramLabel={messages?.sections?.table?.gibsLabel || 'GiB'}
                  />
                  <Table
                    name={messages?.sections?.table?.fargateSpot || 'Fargate Spot'}
                    currency={currency}
                    locale={locale}
                    cpu={prices.fargateSpotPrice.cpu}
                    ram={prices.fargateSpotPrice.ram}
                    total={prices.fargateSpotPrice.total}
                    cpuLabel={messages?.sections?.table?.vcpuLabel || 'vCPU'}
                    ramLabel={messages?.sections?.table?.gibsLabel || 'GiB'}
                  />
                  <p
                    className="border border-[var(--aws-border)] bg-[var(--aws-bg)] px-2 py-1 text-[10px] leading-tight text-[var(--aws-ink-soft)]"
                    role="note"
                  >
                    {messages?.sections?.pricingUpdate || 'Base pricing last updated in January 2021.'}
                  </p>
                </div>
              </div>
            </section>
          </div>

          <section className="border-t border-[var(--aws-border)] p-4 md:p-8">
            <div className="space-y-4">
              {projectDescription.map((item) => (
                <article key={item.title} className="text-sm leading-relaxed text-[var(--aws-ink)]">
                  <h3 className="text-sm sm:text-base font-semibold mb-1">{item.title}</h3>
                  <p className="text-[var(--aws-ink-soft)]">{item.text}</p>
                  {item.links?.length > 0 && (
                    <p className="mt-2 flex flex-wrap gap-2 text-[11px]">
                      {item.links.map((link) => (
                        <a
                          key={link.label}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[var(--aws-link)] hover:text-[var(--aws-accent)] border-b border-transparent hover:border-[var(--aws-accent)]"
                        >
                          {link.label}
                        </a>
                      ))}
                    </p>
                  )}
                </article>
              ))}
            </div>
          </section>
        </div>
      </main>

      <section className="max-w-5xl mx-auto px-3 sm:px-4 pb-6">
        <div className="border border-[#1f2937] bg-gradient-to-r from-[#0b1220] via-[#111827] to-[#0b1220] p-4 sm:p-6 text-[#e2e8f0]">
          <p className="text-[10px] tracking-[0.2em] uppercase text-[#94a3b8]">
            {messages?.marketing?.overline || 'Operator-focused'}
          </p>
          <h3 className="mt-2 text-base sm:text-lg font-semibold text-[#f8fafc]">
            {messages?.marketing?.title || 'Build cost confidence before you click Deploy.'}
          </h3>
          <p className="mt-2 max-w-2xl text-sm text-[#cbd5e1]">
            {messages?.marketing?.text || 'If pricing is uncertain, teams over-allocate, over-spend, and lose momentum. This tool gives fast, repeatable Fargate estimates with no extra dashboard clutter.'}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <a
              href="mailto:contato@fidalgoitsolutions.com.br"
              className="inline-flex items-center px-3.5 py-2 text-sm font-medium bg-[#ff9900] text-[#111827] border border-[#ff9900] hover:bg-[#f59e0b] hover:border-[#f59e0b] transition-colors"
            >
              {messages?.marketing?.buttons?.talk || 'Talk with us'}
            </a>
            <a
              href="https://www.fidalgoitsolutions.com.br/en"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-3.5 py-2 text-sm font-medium bg-[#0b3a64] text-[#f8fafc] border border-[#0b3a64] hover:bg-[#0f4f82] hover:border-[#0f4f82] transition-colors"
            >
              {messages?.marketing?.buttons?.visit || 'Visit Fidalgo IT Solutions'}
            </a>
            <a
              href="https://github.com/theuves/fgcalc"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-3.5 py-2 text-sm font-medium border border-[#334155] text-[#ff9900] hover:bg-[#fff4df] hover:text-[#b45309] transition-colors"
            >
              {messages?.marketing?.buttons?.source || 'Open source project'}
            </a>
          </div>
        </div>
      </section>

      <footer className="max-w-5xl mx-auto px-3 sm:px-4 py-5 text-[var(--aws-ink-soft)]">
        <div className="border-t border-[var(--aws-border)] pt-3">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between md:gap-4">
            <div className="text-[11px] leading-snug text-[var(--aws-ink-soft)]">
              <span className="block font-semibold">{messages?.footer?.copyright || 'Copyright © 2026 Fidalgo IT Solutions'}</span>
              <span className="block">{messages?.footer?.note || 'Independent pricing calculator.'}</span>
              <span className="block">{messages?.marketing?.footerLine || 'Not affiliated with Amazon/AWS; brand names are shown only for context.'}</span>
            </div>
            <nav className="flex items-center gap-4 text-[11px]">
              <a
                href="https://github.com/theuves/fgcalc"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--aws-accent)] transition-colors"
              >
                {messages?.footer?.links?.github || 'GitHub'}
              </a>
              <a
                href="https://fidalgoitsolutions.com.br"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--aws-accent)] transition-colors"
              >
                {messages?.footer?.links?.company || 'Fidalgo IT Solutions'}
              </a>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
