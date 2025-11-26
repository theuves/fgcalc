import React from 'react';

const values = [0.25, 0.5, 1, 2, 4];

export default function CPUInput({ value, onChange }) {
    return (
        <select
            className="w-full mb-4 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2.5 shadow-sm"
            value={value}
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
