import React from 'react';
import ComboSelect from './ComboSelect';
import { CPU_VALUES } from '../utils/fargateResources';

const options = CPU_VALUES.map((value) => ({ value, label: `${value} vCPU` }));

export default function CPUInput({ value, onChange, id, ariaLabel = 'CPU value' }) {
  return <ComboSelect id={id} value={value} onChange={onChange} options={options} ariaLabel={ariaLabel} />;
}
