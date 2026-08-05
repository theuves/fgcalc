import React from 'react';

const DEFAULT_TIME_LABELS = {
  hour: { singular: 'hour', plural: 'hours' },
  day: { singular: 'day', plural: 'days' },
  month: { singular: 'month', plural: 'months' },
  year: { singular: 'year', plural: 'years' },
};

export default function TimeInput({
  value,
  type,
  onValueChange,
  onTypeChange,
  valueInputId,
  typeInputId,
  valueAriaLabel = 'Duration value',
  typeAriaLabel = 'Duration unit',
  helperText = `Type and then choose ${typeAriaLabel.toLowerCase()}.`,
  timeUnits = DEFAULT_TIME_LABELS,
}) {
  const getLabel = (unit) => {
    const labels = timeUnits[unit] || DEFAULT_TIME_LABELS[unit] || { singular: unit, plural: `${unit}s` };
    return value > 1 ? labels.plural : labels.singular;
  };

    const inputClasses =
        'w-16 sm:w-20 mr-2 sm:mr-3 bg-[var(--aws-surface)] border border-[var(--aws-border)] text-[var(--aws-ink)] text-base sm:text-sm rounded-sm px-2 py-2 focus:outline-none focus:ring-1 focus:ring-[var(--aws-accent)]';
    const selectClasses =
        'min-w-0 flex-1 bg-[var(--aws-surface)] border border-[var(--aws-border)] text-[var(--aws-ink)] text-base sm:text-sm rounded-sm px-2 py-2 focus:outline-none focus:ring-1 focus:ring-[var(--aws-accent)]';

    return (
        <div className="flex gap-2 mb-4">
            <input
                id={valueInputId}
                className={inputClasses}
                type="number"
                value={value}
                min="1"
                inputMode="numeric"
                aria-label={valueAriaLabel}
                aria-describedby={`${valueInputId}-helper`}
                onChange={(e) => {
                  const nextValue = Number(e.target.value);
                  onValueChange(Number.isFinite(nextValue) ? nextValue : 0);
                }}
            />
            <select
                id={typeInputId}
                className={selectClasses}
                value={type}
                aria-label={typeAriaLabel}
                onChange={(e) => onTypeChange(e.target.value)}
            >
                <option value="hour">{getLabel('hour')}</option>
                <option value="day">{getLabel('day')}</option>
                <option value="month">{getLabel('month')}</option>
                <option value="year">{getLabel('year')}</option>
            </select>
            <span id={`${valueInputId}-helper`} className="sr-only">{helperText}</span>
        </div>
    );
}
