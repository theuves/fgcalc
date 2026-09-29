import React from 'react';
import formatPrice from '../utils/formatPrice.js';
export default function Table({ name, cpu, ram, total, currency, locale = 'en', cpuLabel = 'vCPU', ramLabel = 'GiB' }) {
  const cpuShare = Number.isFinite(cpu) && Number.isFinite(total)
    ? `${(total > 0 ? cpu / total * 100 : 0).toFixed(0)}% CPU`
    : '—';
  return <div className="breakdown-card"><div className="breakdown-card-top"><strong>{name}</strong><span>{formatPrice(total, currency, locale)}</span></div><div className="breakdown-card-body"><span>{cpuLabel} <b>{formatPrice(cpu, currency, locale)}</b></span><span>{ramLabel} <b>{formatPrice(ram, currency, locale)}</b></span><span>{cpuShare}</span></div></div>;
}
