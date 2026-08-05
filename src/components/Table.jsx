import React from 'react';
import formatPrice from '../utils/formatPrice.js';

export default function Table({ name, cpu, ram, total, currency, locale = 'en', cpuLabel = 'vCPU', ramLabel = 'GiB' }) {
    const safeTotal = total || 1;
    return (
        <div className="overflow-hidden border border-[var(--aws-border)] bg-[var(--aws-surface)]">
            <table className="w-full text-sm text-left text-[var(--aws-ink)] font-mono">
                <thead className="text-[11px] text-[var(--aws-ink-soft)] uppercase bg-[var(--aws-bg)] border-b border-[var(--aws-border)]">
                    <tr>
                        <th scope="col" className="px-4 py-2 font-semibold" colSpan="3">
                            <span className="border-l-2 border-[var(--aws-accent)] pl-2">{name}</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="border-b border-[var(--aws-border)]">
                        <td className="px-4 py-3 font-medium text-[var(--aws-ink-soft)] w-1/4">{cpuLabel}</td>
                        <td className="px-4 py-3">{formatPrice(cpu, currency, locale)}</td>
                        <td className="px-4 py-3 text-right text-[var(--aws-ink-soft)] w-1/4">
                            {((cpu / safeTotal) * 100 || 0).toFixed(2)}%
                        </td>
                    </tr>
                    <tr>
                        <td className="px-4 py-3 font-medium text-[var(--aws-ink-soft)] w-1/4">{ramLabel}</td>
                        <td className="px-4 py-3">{formatPrice(ram, currency, locale)}</td>
                        <td className="px-4 py-3 text-right text-[var(--aws-ink-soft)] w-1/4">
                            {((ram / safeTotal) * 100 || 0).toFixed(2)}%
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
