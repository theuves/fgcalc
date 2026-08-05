import React from 'react';

const values = [0.25, 0.5, 1, 2, 4];

export default function CPUInput({ value, onChange, id, ariaLabel = 'CPU value' }) {
    return (
        <select
            id={id}
            className="w-full bg-[var(--aws-surface)] border border-[var(--aws-border)] text-[var(--aws-ink)] text-sm rounded-sm px-2 py-2 focus:outline-none focus:ring-1 focus:ring-[var(--aws-accent)]"
            value={value}
            aria-label={ariaLabel}
            onChange={(e) => onChange(Number(e.target.value))}
        >
            {values.map((v) => (
                <option key={v} value={v}>
                    {v} vCPU
                </option>
            ))}
        </select>
    );
}
