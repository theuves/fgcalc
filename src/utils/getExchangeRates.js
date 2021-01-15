export default function getExchangeRates() {
    const API_URL = 'https://api.exchangeratesapi.io/latest?base=USD'
    return fetch(API_URL)
        .then(response => response.json())
        .then(data => data.rates)
}