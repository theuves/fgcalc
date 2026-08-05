import React from 'react';
import data from '../../utils/data.js';
import SearchSelectInput from './SearchSelectInput';

const regions = data.map(value => ({
    name: value.region,
    description: value.description
}));

export default function RegionInput({
    value,
    onChange,
    t,
    buttonWidthClass = 'min-w-[150px]',
    buttonHeightClass = 'h-8',
    buttonTextClass = 'text-[11px]',
    buttonPaddingClass = 'px-2',
}) {
    return (
        <SearchSelectInput
            label={t?.selectors?.regionLabel || 'Region'}
            value={value}
            onChange={onChange}
            placeholder={t?.selectors?.regionPlaceholder || 'Search region...'}
            options={regions}
            getOptionValue={(region) => region.name}
            getOptionLabel={(region) => region.description}
            buttonWidthClass={buttonWidthClass}
            buttonHeightClass={buttonHeightClass}
            buttonTextClass={buttonTextClass}
            buttonPaddingClass={buttonPaddingClass}
            showCaret={false}
            openButtonPrefix={t?.selectors?.openSelector || 'Open'}
            closeButtonLabel={t?.selectors?.closeSelector || 'Close selector'}
            noResultsText={t?.selectors?.noResults || 'No results.'}
            resultHintTemplate={t?.selectors?.resultHint || '{count} options available. Use arrow keys and Enter to select.'}
        />
    );
}
