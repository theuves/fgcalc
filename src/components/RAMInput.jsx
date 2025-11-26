import React, { useMemo } from 'react';

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

export default function RAMInput({ cpu, value, onChange }) {
    const values = useMemo(() => getValues(String(cpu)), [cpu]);

    return (
        <select
            className="w-full mb-4 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2.5 shadow-sm"
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
        >
            {values.map((v) => (
                <option key={v} value={v}>
                    {v} GiB
                </option>
            ))}
        </select>
    );
}
