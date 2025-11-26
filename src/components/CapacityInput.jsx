import React, { useId } from 'react';

export default function CapacityInput({ name, value, onChange }) {
    const id = useId();

    return (
        <div className="flex mb-4 items-center">
            <input
                id={id}
                className="w-20 mr-4 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2.5 shadow-sm invalid:bg-pink-100"
                type="number"
                min="0"
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
            />
            <label htmlFor={id} className="font-bold text-gray-700 flex items-center">
                <span className="mr-4 font-light text-xl">&times;</span>
                {name}
            </label>
        </div>
    );
}
