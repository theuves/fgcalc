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

export default function RAMInput({ cpu, value, onChange, id, ariaLabel = 'Memory value in GiB' }) {
    const values = useMemo(() => getValues(String(cpu)), [cpu]);

    return (
        <select
            id={id}
            className="w-full bg-[var(--aws-surface)] border border-[var(--aws-border)] text-[var(--aws-ink)] text-base sm:text-sm rounded-sm px-2 py-2 focus:outline-none focus:ring-1 focus:ring-[var(--aws-accent)]"
            value={value}
            aria-label={ariaLabel}
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
