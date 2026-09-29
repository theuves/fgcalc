import React from 'react';
import ComboSelect from '../ComboSelect';

const CURRENCY_EMOJIS = {
  USD: '🇺🇸',
  EUR: '🇪🇺',
  GBP: '🇬🇧',
  JPY: '🇯🇵',
  AUD: '🇦🇺',
  CAD: '🇨🇦',
  CHF: '🇨🇭',
  CNY: '🇨🇳',
  BRL: '🇧🇷',
  INR: '🇮🇳',
  MXN: '🇲🇽',
  ZAR: '🇿🇦',
};

function getCurrencyName(code, locale = 'en') {
  try {
    return new Intl.DisplayNames([locale], { type: 'currency' }).of(code);
  } catch {
    return code;
  }
}

function CurrencyLabel({ currency, compact = false }) {
  return (
    <span className="currency-option">
      <span className="currency-emoji" aria-hidden="true">{CURRENCY_EMOJIS[currency.code] || '💱'}</span>
      <span className="currency-option-name">
        {compact ? currency.code : `${currency.code} · ${currency.name}`}
      </span>
    </span>
  );
}

export default function CurrencyInput({ id, value, onChange, currencyList, t, locale = 'en' }) {
  const options = currencyList.map((code) => {
    const name = getCurrencyName(code, locale);
    return { value: code, label: `${code} · ${name}`, searchText: `${code} ${name}`, code, name };
  });

  return (
    <ComboSelect
      id={id}
      value={value}
      onChange={onChange}
      options={options}
      ariaLabel={t?.selectors?.currencyLabel || 'Currency'}
      searchable
      searchPlaceholder={t?.selectors?.currencyPlaceholder || 'Search currency...'}
      noResultsText={t?.selectors?.noResults || 'No results.'}
      renderValue={(currency) => <CurrencyLabel currency={currency} compact />}
      renderOption={(currency) => <CurrencyLabel currency={currency} />}
    />
  );
}
