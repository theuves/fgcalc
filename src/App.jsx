import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header/Header';
import Banner from './components/Banner';
import TimeInput from './components/TimeInput';
import CPUInput from './components/CPUInput';
import RAMInput from './components/RAMInput';
import CapacityInput from './components/CapacityInput';
import Table from './components/Table';
import createPriceGetter from './utils/createPriceGetter';
import formatPrice from './utils/formatPrice';
import getExchangeRates from './utils/getExchangeRates';
import { POPULAR_CURRENCIES } from './utils/currencies';

function App() {
  // Header inputs
  const [region, setRegion] = useState('us-east-1');
  const [currency, setCurrency] = useState('USD');

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
        setCurrencyRates(rates);
        console.info('[INFO] Exchange rates updated successfully.');
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
    if (capacityFargate < 0 || capacityFargateSpot < 0 || timeValue < 0) {
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

  // Create filtered currency list with popular currencies first
  const availableCurrencies = useMemo(() => {
    const allCurrencies = Object.keys(currencyRates);

    // Filter popular currencies that exist in the rates
    const popular = POPULAR_CURRENCIES.filter(curr => allCurrencies.includes(curr));

    // Get remaining currencies not in popular list
    const others = allCurrencies
      .filter(curr => !POPULAR_CURRENCIES.includes(curr))
      .sort();

    // Return popular currencies first, then others
    return [...popular, ...others];
  }, [currencyRates]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header with region and currency selection */}
      <Header
        region={region}
        setRegion={setRegion}
        currency={currency}
        setCurrency={setCurrency}
        currencyList={availableCurrencies}
        isLoadingRates={isLoadingRates}
      />

      {/* Promotional Banner */}
      <Banner />

      {/* Main Calculator Section */}
      <main className="max-w-6xl mx-auto px-4 pb-12">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
            {/* Left Column - Input Form */}
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-6 pb-3 border-b-2 border-indigo-200">
                Configuration
              </h2>
              <form className="space-y-1">
                {/* Time Period Input */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Time Period
                  </label>
                  <TimeInput
                    value={timeValue}
                    type={timeType}
                    onValueChange={setTimeValue}
                    onTypeChange={setTimeType}
                  />
                </div>

                {/* CPU Input */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    CPU (vCPU)
                  </label>
                  <CPUInput value={cpu} onChange={setCpu} />
                </div>

                {/* RAM Input */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Memory (GiB)
                  </label>
                  <RAMInput cpu={cpu} value={ram} onChange={setRam} />
                </div>

                {/* Fargate Capacity Input */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Fargate Tasks
                  </label>
                  <CapacityInput
                    name="FARGATE"
                    value={capacityFargate}
                    onChange={setCapacityFargate}
                  />
                </div>

                {/* Fargate Spot Capacity Input */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Fargate Spot Tasks
                  </label>
                  <CapacityInput
                    name="FARGATE_SPOT"
                    value={capacityFargateSpot}
                    onChange={setCapacityFargateSpot}
                  />
                </div>
              </form>
            </div>

            {/* Right Column - Price Estimate */}
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-6 pb-3 border-b-2 border-indigo-200">
                Estimated Cost
              </h2>
              <div className="text-center">
                {/* Total Price Display */}
                <div className="mb-8 p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg border-2 border-indigo-200">
                  <p className="text-sm text-gray-600 mb-2 uppercase tracking-wide font-semibold">
                    Total Cost
                  </p>
                  <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 font-mono">
                    {formatPrice(prices.total, currency)}
                  </h1>
                </div>

                {/* Detailed Breakdown Tables */}
                <div className="space-y-4">
                  <Table
                    name="FARGATE"
                    currency={currency}
                    cpu={prices.fargatePrice.cpu}
                    ram={prices.fargatePrice.ram}
                    total={prices.total}
                  />
                  <Table
                    name="FARGATE_SPOT"
                    currency={currency}
                    cpu={prices.fargateSpotPrice.cpu}
                    ram={prices.fargateSpotPrice.ram}
                    total={prices.total}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-600">
        <p className="text-sm">
          &copy; 2021 - {(new Date()).getFullYear()} {' '}
          <a
            href="https://fidalgoitsolutions.com.br"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-600 hover:text-purple-800 font-semibold transition-colors"
          >
            Fidalgo IT Solutions
          </a>.{' '}
          All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default App;
