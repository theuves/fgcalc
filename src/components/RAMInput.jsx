import React, { useMemo } from 'react';
import ComboSelect from './ComboSelect';

function getRange(start, end) {
    return Array(end - start + 1)
        .fill(start)
        .map((item, index) => item + index);
}

function getValues(currentCPU) {
    const possibleRAMValues = {
        '0.25': [0.5, 1, 2],
        '0.5': getRange(1, 4),
        '1': getRange(2, 8),
        '2': getRange(4, 16),
        '4': getRange(8, 30),
    };

    return currentCPU in possibleRAMValues
        ? possibleRAMValues[currentCPU]
        : possibleRAMValues[Object.keys(possibleRAMValues)[0]];
}

export default function RAMInput({ cpu, value, onChange, id, ariaLabel = 'Memory value in GiB' }) {
    const options = useMemo(() => getValues(String(cpu)).map((amount) => ({ value: amount, label: `${amount} GiB` })), [cpu]);

    return <ComboSelect id={id} value={value} onChange={onChange} options={options} ariaLabel={ariaLabel} />;
}
