// Price service for fetching cryptocurrency prices
const COINGECKO_API = 'https://api.coingecko.com/api/v3';

class PriceService {
  constructor() {
    this.prices = {
      celo: 0,
      cusd: 1.0, // cUSD is pegged to $1
    };
    this.lastFetch = 0;
    this.cacheTime = 60000; // 1 minute cache
  }

  async fetchPrices() {
    const now = Date.now();
    
    // Use cache if recent
    if (now - this.lastFetch < this.cacheTime) {
      return this.prices;
    }

    try {
      const response = await fetch(
        `${COINGECKO_API}/simple/price?ids=celo&vs_currencies=usd`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch prices');
      }

      const data = await response.json();
      
      this.prices = {
        celo: data.celo?.usd || 0,
        cusd: 1.0, // cUSD is always $1
      };
      
      this.lastFetch = now;
      return this.prices;
    } catch (error) {
      console.warn('Failed to fetch crypto prices:', error);
      // Return cached prices or defaults
      return this.prices;
    }
  }

  async getCeloPrice() {
    const prices = await this.fetchPrices();
    return prices.celo;
  }

  async getCUSDPrice() {
    return 1.0; // cUSD is pegged to $1
  }

  formatUSD(amount, cryptoPrice) {
    const usdValue = amount * cryptoPrice;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(usdValue);
  }
}

// Export singleton instance
export const priceService = new PriceService();
