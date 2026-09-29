import React from 'react';
import ComboSelect from './ComboSelect';

const DEFAULT_TIME_LABELS = {hour:{singular:'hour',plural:'hours'},day:{singular:'day',plural:'days'},month:{singular:'month',plural:'months'},year:{singular:'year',plural:'years'}};

export default function TimeInput({ value, type, onValueChange, onTypeChange, valueInputId, typeInputId, valueAriaLabel = 'Duration value', typeAriaLabel = 'Duration unit', helperText, timeUnits = DEFAULT_TIME_LABELS }) {
  const options = ['hour', 'day', 'month', 'year'].map((unit) => {
    const labels = timeUnits[unit] || DEFAULT_TIME_LABELS[unit];
    return { value: unit, label: value > 1 ? labels.plural : labels.singular };
  });

  return (
    <div className="time-fields">
      <input
        id={valueInputId}
        type="text"
        value={value}
        inputMode="numeric"
        pattern="[0-9]*"
        aria-label={valueAriaLabel}
        aria-describedby={`${valueInputId}-helper`}
        onChange={(event) => {
          const next = event.target.value;
          if (/^\d*$/.test(next)) onValueChange(next === '' ? '' : Number(next));
        }}
      />
      <ComboSelect id={typeInputId} value={type} onChange={onTypeChange} options={options} ariaLabel={typeAriaLabel} />
      <span id={`${valueInputId}-helper`} className="sr-only">{helperText}</span>
    </div>
  );
}
