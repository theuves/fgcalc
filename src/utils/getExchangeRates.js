/**
 * Fetches current exchange rates from USD to various currencies
 * Uses the open.er-api.com free API
 * @returns {Promise<Object>} Object with currency codes as keys and rates as values
 */
export default async function getExchangeRates() {
    try {
        const response = await fetch('https://open.er-api.com/v6/latest/USD');
        const data = await response.json();

        if (data.result === 'success' && data.rates) {
            return data.rates;
        } else {
            console.error('[ERROR] Failed to fetch exchange rates:', data);
            // Return USD only as fallback
            return { USD: 1 };
        }
    } catch (error) {
        console.error('[ERROR] Exchange rate API error:', error);
        // Return USD only as fallback
        return { USD: 1 };
    }
}