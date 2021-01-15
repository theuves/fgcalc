export default function getTime(value, type) {
    switch (type) {
        case 'hour':
        default:
            return value * 1
        case 'day':
            return value * 24
        case 'month':
            return value * 730
        case 'year':
            return value * 8760
    }
}