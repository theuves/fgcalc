/**
 * Fetches current exchange rates from USD to various currencies
 * Uses the open.er-api.com free API
 * @returns {Promise<Object>} Object with currency codes as keys and rates as values
 */
export default async function getExchangeRates() {
    try {
        const response = await fetch('https://open.er-api.com/v6/latest/USD');
        if (!response.ok) throw new Error(`Exchange rate request failed: ${response.status}`);
        const data = await response.json();

        if (data.result === 'success' && data.rates && typeof data.rates === 'object') {
            const rates = Object.fromEntries(
                Object.entries(data.rates).filter(([code, rate]) => /^[A-Z]{3}$/.test(code) && Number.isFinite(rate) && rate > 0)
            );
            return { ...rates, USD: 1 };
        } else {
            console.error('[ERROR] Failed to fetch exchange rates:', data);
            return null;
        }
    } catch (error) {
        console.error('[ERROR] Exchange rate API error:', error);
        return null;
    }
}
