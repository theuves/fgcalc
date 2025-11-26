import React from 'react';

function pluralize(word, count) {
    return count > 1 ? word + 's' : word;
}

export default function TimeInput({ value, type, onValueChange, onTypeChange }) {
    return (
        <div className="flex mb-4">
            <input
                className="w-20 mr-4 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2.5 shadow-sm invalid:bg-pink-100"
                type="number"
                value={value}
                min="1"
                onChange={(e) => onValueChange(Number(e.target.value))}
            />
            <select
                className="flex-1 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2.5 shadow-sm"
                value={type}
                onChange={(e) => onTypeChange(e.target.value)}
            >
                <option value="hour">{pluralize('hour', value)}</option>
                <option value="day">{pluralize('day', value)}</option>
                <option value="month">{pluralize('month', value)}</option>
                <option value="year">{pluralize('year', value)}</option>
            </select>
        </div>
    );
}
