import React from 'react';
import formatPrice from '../utils/formatPrice.js';
export default function Table({ name, cpu, ram, total, currency, locale = 'en', cpuLabel = 'vCPU', ramLabel = 'GiB' }) {
  const safeTotal = total || 1;
  return <div className="breakdown-card"><div className="breakdown-card-top"><strong>{name}</strong><span>{formatPrice(total, currency, locale)}</span></div><div className="breakdown-card-body"><span>{cpuLabel} <b>{formatPrice(cpu, currency, locale)}</b></span><span>{ramLabel} <b>{formatPrice(ram, currency, locale)}</b></span><span>{((cpu / safeTotal) * 100 || 0).toFixed(0)}% CPU</span></div></div>;
}
