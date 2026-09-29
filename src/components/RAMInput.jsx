import React, { useMemo } from 'react';
import ComboSelect from './ComboSelect';
import { getMemoryValues } from '../utils/fargateResources';

export default function RAMInput({ cpu, value, onChange, id, ariaLabel = 'Memory value in GiB' }) {
    const options = useMemo(() => getMemoryValues(cpu).map((amount) => ({ value: amount, label: `${amount} GiB` })), [cpu]);

    return <ComboSelect id={id} value={value} onChange={onChange} options={options} ariaLabel={ariaLabel} />;
}
