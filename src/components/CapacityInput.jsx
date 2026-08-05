import React, { useId } from 'react';

export default function CapacityInput({ name, value, onChange, id, ariaLabel }) {
    const generatedId = useId();
    const inputId = id || generatedId;

    return (
        <div className="flex mb-4 items-center">
            <input
                id={inputId}
                className="w-20 sm:w-20 mr-2 sm:mr-3 bg-[var(--aws-surface)] border border-[var(--aws-border)] text-[var(--aws-ink)] text-sm rounded-sm px-2 py-2 invalid:bg-[#fee2e2] focus:outline-none focus:ring-1 focus:ring-[var(--aws-accent)]"
                type="number"
                min="0"
                aria-label={ariaLabel || name}
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
            />
            <label htmlFor={inputId} className="font-semibold text-[var(--aws-ink-soft)] flex items-center">
                <span className="mr-3 text-[var(--aws-accent)]">&times;</span>
                {name}
            </label>
        </div>
    );
}
