export default function formatPrice(value, currency) {
    value = value || 0
    return value.toLocaleString('en-US', {
        style: 'currency',
        currency,
        minimumFractionDigits: 3
    })
}