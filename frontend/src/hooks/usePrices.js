import { useState, useEffect } from 'react';
import { priceService } from '../utils/priceService';

export const usePrices = () => {
  const [prices, setPrices] = useState({
    celo: 0,
    cusd: 1.0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const fetchedPrices = await priceService.fetchPrices();
        setPrices(fetchedPrices);
      } catch (error) {
        console.error('Error fetching prices:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();
    
    // Refresh prices every minute
    const interval = setInterval(fetchPrices, 60000);
    
    return () => clearInterval(interval);
  }, []);

  const formatUSD = (amount, token) => {
    const price = token === 'CELO' ? prices.celo : prices.cusd;
    return priceService.formatUSD(amount, price);
  };

  return { prices, loading, formatUSD };
};
