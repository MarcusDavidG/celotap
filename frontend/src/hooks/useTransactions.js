import { useState, useEffect } from 'react';
import { transactionService } from '../utils/transactionService';

export const useTransactions = (address, limit = 10) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!address) {
      setTransactions([]);
      setLoading(false);
      return;
    }

    const fetchTransactions = async () => {
      try {
        setLoading(true);
        const txs = await transactionService.getAllTransactions(address, limit);
        setTransactions(txs);
        setError(null);
      } catch (err) {
        console.error('Error fetching transactions:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();

    // Refresh transactions every 30 seconds
    const interval = setInterval(fetchTransactions, 30000);

    return () => clearInterval(interval);
  }, [address, limit]);

  return { transactions, loading, error };
};
