import React from 'react';
import data from '../../utils/data.js';
import ComboSelect from '../ComboSelect';

const regions = data.map(({ region, description }) => ({
  value: region,
  label: description,
  searchText: `${description} ${region}`,
}));

export default function RegionInput({ id, value, onChange, t }) {
  return (
    <ComboSelect
      id={id}
      value={value}
      onChange={onChange}
      options={regions}
      ariaLabel={t?.selectors?.regionLabel || 'Region'}
      searchable
      searchPlaceholder={t?.selectors?.regionPlaceholder || 'Search region...'}
      noResultsText={t?.selectors?.noResults || 'No results.'}
      renderOption={(option) => <><span>{option.label}</span><small>{option.value}</small></>}
    />
  );
}
