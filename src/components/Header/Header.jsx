import React from 'react';
import RegionInput from './RegionInput';
import CurrencyInput from './CurrencyInput';

export default function Header({ region, setRegion, currency, setCurrency, currencyList, isLoadingRates }) {
    return (
        <header className="bg-indigo-900 shadow-md py-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between">
                <div className="mb-4 sm:mb-0">
                    <h1 className="text-2xl font-light text-white">
                        AWS Fargate Pricing Calculator
                    </h1>
                    {isLoadingRates && (
                        <p className="text-xs text-purple-200 mt-1 flex items-center">
                            <svg className="animate-spin h-3 w-3 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Updating exchange rates...
                        </p>
                    )}
                </div>
                <div className="flex items-center">
                    <CurrencyInput value={currency} onChange={setCurrency} currencyList={currencyList} />
                    <RegionInput value={region} onChange={setRegion} />
                </div>
            </div>
        </header>
    );
}
