// Transaction service for fetching transaction history from Celo Sepolia Blockscout
const BLOCKSCOUT_API = 'https://celo-sepolia.blockscout.com/api';

class TransactionService {
  async getTransactions(address, limit = 10) {
    try {
      const response = await fetch(
        `${BLOCKSCOUT_API}?module=account&action=txlist&address=${address}&sort=desc&page=1&offset=${limit}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch transactions');
      }

      const data = await response.json();

      if (data.status !== '1' || !Array.isArray(data.result)) {
        return [];
      }

      return data.result.map(tx => ({
        hash: tx.hash,
        from: tx.from,
        to: tx.to,
        value: tx.value,
        timestamp: parseInt(tx.timeStamp) * 1000,
        isError: tx.isError === '1',
        blockNumber: tx.blockNumber,
        gas: tx.gas,
        gasUsed: tx.gasUsed,
        gasPrice: tx.gasPrice,
      }));
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
      return [];
    }
  }

  async getTokenTransfers(address, limit = 10) {
    try {
      const response = await fetch(
        `${BLOCKSCOUT_API}?module=account&action=tokentx&address=${address}&sort=desc&page=1&offset=${limit}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch token transfers');
      }

      const data = await response.json();

      if (data.status !== '1' || !Array.isArray(data.result)) {
        return [];
      }

      return data.result.map(tx => ({
        hash: tx.hash,
        from: tx.from,
        to: tx.to,
        value: tx.value,
        timestamp: parseInt(tx.timeStamp) * 1000,
        tokenSymbol: tx.tokenSymbol,
        tokenName: tx.tokenName,
        tokenDecimal: parseInt(tx.tokenDecimal),
        blockNumber: tx.blockNumber,
      }));
    } catch (error) {
      console.error('Failed to fetch token transfers:', error);
      return [];
    }
  }

  async getAllTransactions(address, limit = 10) {
    try {
      const [normalTxs, tokenTxs] = await Promise.all([
        this.getTransactions(address, limit),
        this.getTokenTransfers(address, limit),
      ]);

      // Combine and sort by timestamp
      const allTxs = [
        ...normalTxs.map(tx => ({ ...tx, type: 'CELO' })),
        ...tokenTxs.map(tx => ({ ...tx, type: 'TOKEN' })),
      ].sort((a, b) => b.timestamp - a.timestamp);

      return allTxs.slice(0, limit);
    } catch (error) {
      console.error('Failed to fetch all transactions:', error);
      return [];
    }
  }

  formatValue(value, decimals = 18) {
    if (!value) return '0';
    const divisor = Math.pow(10, decimals);
    return (parseInt(value) / divisor).toFixed(4);
  }

  formatAddress(address) {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  }

  getExplorerUrl(hash) {
    return `https://celo-sepolia.blockscout.com/tx/${hash}`;
  }
}

export const transactionService = new TransactionService();
