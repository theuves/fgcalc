import React from 'react';
import SearchSelectInput from './SearchSelectInput';

function getCurrencyName(code, locale = 'en') {
  try {
    return new Intl.DisplayNames([locale], { type: 'currency' }).of(code);
  } catch {
    return code;
  }
}

export default function CurrencyInput({
    value,
    onChange,
    currencyList,
    t,
    locale = 'en',
    buttonWidthClass = 'min-w-[72px]',
    buttonHeightClass = 'h-8',
    buttonTextClass = 'text-[11px]',
    buttonPaddingClass = 'px-2',
}) {
    const options = currencyList.map((currency) => ({
      value: currency,
      code: currency,
      name: getCurrencyName(currency, locale),
      label: `${currency} - ${getCurrencyName(currency)}`,
    }));

    const displayName = (currencyCode) => getCurrencyName(currencyCode, locale);

    return (
        <SearchSelectInput
            label={t?.selectors?.currencyLabel || 'Currency'}
            value={value}
            onChange={onChange}
            placeholder={t?.selectors?.currencyPlaceholder || 'Search currency...'}
            options={options}
            getOptionValue={(currency) => currency.value}
            getOptionLabel={(currency) => `${currency.value} - ${displayName(currency.code)}`}
            getOptionDisplayLabel={(currency) => currency.code}
            showCaret={false}
            buttonClassName="justify-center"
            getOptionSearchText={(currency) => `${currency.code} ${displayName(currency.code)}`}
            buttonWidthClass={buttonWidthClass}
            buttonHeightClass={buttonHeightClass}
            buttonTextClass={buttonTextClass}
            buttonPaddingClass={buttonPaddingClass}
            openButtonPrefix={t?.selectors?.openSelector || 'Open'}
            closeButtonLabel={t?.selectors?.closeSelector || 'Close selector'}
            noResultsText={t?.selectors?.noResults || 'No results.'}
            resultHintTemplate={t?.selectors?.resultHint || '{count} options available. Use arrow keys and Enter to select.'}
        />
    );
}
