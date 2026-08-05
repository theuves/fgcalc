export default function formatPrice(value, currency, locale = 'en') {
    const safeValue = Number.isFinite(value) ? value : 0
    return safeValue.toLocaleString(locale, {
        style: 'currency',
        currency,
        minimumFractionDigits: 3
    })
}
