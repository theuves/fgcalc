import React from 'react';
export default function CapacityInput({ value, onChange, id, ariaLabel }) {
  return <div className="capacity-field"><input id={id} type="text" inputMode="numeric" pattern="[0-9]*" aria-label={ariaLabel} value={value} onChange={(event) => { const next = event.target.value; if (/^\d*$/.test(next)) onChange(next === '' ? '' : Number(next)); }} /><span className="capacity-suffix" aria-hidden="true">×</span></div>;
}
