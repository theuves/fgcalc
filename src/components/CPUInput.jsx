import React from 'react';
import ComboSelect from './ComboSelect';

const options = [0.25, 0.5, 1, 2, 4].map((value) => ({ value, label: `${value} vCPU` }));

export default function CPUInput({ value, onChange, id, ariaLabel = 'CPU value' }) {
  return <ComboSelect id={id} value={value} onChange={onChange} options={options} ariaLabel={ariaLabel} />;
}
