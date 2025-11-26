import React from 'react';
import data from '../../utils/data.js';

const regions = data.map(value => ({
    name: value.region,
    description: value.description
}));

export default function RegionInput({ value, onChange }) {
    return (
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2.5 shadow-sm"
        >
            {regions.map((region) => (
                <option key={region.name} value={region.name}>
                    {region.description}
                </option>
            ))}
        </select>
    );
}
