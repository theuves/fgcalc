import React from 'react';

export default function CurrencyInput({ value, onChange, currencyList }) {
    return (
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2.5 mr-2 shadow-sm"
        >
            {currencyList.map((currency) => (
                <option key={currency} value={currency}>
                    {currency}
                </option>
            ))}
        </select>
    );
}
