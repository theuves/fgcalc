export default function formatPrice(value, currency, locale = 'en') {
    if (!Number.isFinite(value)) return '—'
    return value.toLocaleString(locale, {
        style: 'currency',
        currency,
        minimumFractionDigits: 3
    })
}
