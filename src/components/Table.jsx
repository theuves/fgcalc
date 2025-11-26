import React from 'react';
import formatPrice from '../utils/formatPrice.js';

export default function Table({ name, cpu, ram, total, currency }) {
    return (
        <div className="w-4/5 mx-auto mb-4 overflow-hidden rounded-lg shadow-sm border border-gray-200">
            <table className="w-full text-sm text-left text-gray-500 font-mono">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 bg-gray-100" colSpan="3">
                            {name}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="bg-white border-b hover:bg-gray-50">
                        <td className="px-6 py-4 font-bold">vCPU</td>
                        <td className="px-6 py-4">{formatPrice(cpu, currency)}</td>
                        <td className="px-6 py-4">{((cpu / total) * 100 || 0).toFixed(2)}%</td>
                    </tr>
                    <tr className="bg-white hover:bg-gray-50">
                        <td className="px-6 py-4 font-bold">GiB</td>
                        <td className="px-6 py-4">{formatPrice(ram, currency)}</td>
                        <td className="px-6 py-4">{((ram / total) * 100 || 0).toFixed(2)}%</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
