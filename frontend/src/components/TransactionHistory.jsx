import React from 'react';
import { FaExternalLinkAlt, FaArrowUp, FaArrowDown, FaHistory } from 'react-icons/fa';
import { IoSparkles } from 'react-icons/io5';
import { useTransactions } from '../hooks/useTransactions';
import { transactionService } from '../utils/transactionService';

const TransactionHistory = ({ address }) => {
  const { transactions, loading, error } = useTransactions(address, 8);

  const formatTime = (timestamp) => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const getTransactionDirection = (tx) => {
    return tx.from.toLowerCase() === address.toLowerCase() ? 'sent' : 'received';
  };

  if (!address) return null;

  return (
    <div className="glass-effect rounded-2xl p-6 border border-celo-primary/20">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-celo-purple/20 rounded-xl flex items-center justify-center">
            <FaHistory className="text-celo-purple" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Transaction History</h3>
            <p className="text-sm text-gray-400">Recent activity</p>
          </div>
        </div>
        <IoSparkles className="text-2xl text-celo-purple" />
      </div>

      {loading && (
        <div className="text-center py-8">
          <div className="inline-block w-8 h-8 border-2 border-celo-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-400 text-sm mt-2">Loading transactions...</p>
        </div>
      )}

      {error && (
        <div className="text-center py-8">
          <p className="text-red-400 text-sm">Failed to load transactions</p>
        </div>
      )}

      {!loading && !error && transactions.length === 0 && (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-3">
            <FaHistory className="text-3xl text-gray-500" />
          </div>
          <p className="text-gray-400">No transactions yet</p>
          <p className="text-gray-500 text-sm mt-1">Start by making your first payment</p>
        </div>
      )}

      {!loading && !error && transactions.length > 0 && (
        <div className="space-y-3">
          {transactions.map((tx) => {
            const direction = getTransactionDirection(tx);
            const isSent = direction === 'sent';
            const amount = tx.type === 'TOKEN' 
              ? transactionService.formatValue(tx.value, tx.tokenDecimal)
              : transactionService.formatValue(tx.value);
            const symbol = tx.type === 'TOKEN' ? tx.tokenSymbol : 'CELO';

            return (
              <div
                key={tx.hash}
                className="glass-effect rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        isSent
                          ? 'bg-red-500/20 text-red-400'
                          : 'bg-green-500/20 text-green-400'
                      }`}
                    >
                      {isSent ? <FaArrowUp /> : <FaArrowDown />}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <p className="text-white font-semibold capitalize">
                          {direction}
                        </p>
                        {tx.isError && (
                          <span className="text-xs px-2 py-0.5 bg-red-500/20 text-red-400 rounded">
                            Failed
                          </span>
                        )}
                      </div>
                      
                      <div className="text-sm text-gray-400">
                        <p className="truncate">
                          {isSent ? 'To: ' : 'From: '}
                          <span className="font-mono">
                            {transactionService.formatAddress(isSent ? tx.to : tx.from)}
                          </span>
                        </p>
                      </div>

                      <p className="text-xs text-gray-500 mt-1">
                        {formatTime(tx.timestamp)}
                      </p>
                    </div>
                  </div>

                  <div className="text-right ml-3">
                    <p
                      className={`font-bold ${
                        isSent ? 'text-red-400' : 'text-green-400'
                      }`}
                    >
                      {isSent ? '-' : '+'}{amount} {symbol}
                    </p>
                    <a
                      href={transactionService.getExplorerUrl(tx.hash)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1 text-xs text-celo-primary hover:text-celo-primary/80 transition-colors mt-1"
                    >
                      <span>View</span>
                      <FaExternalLinkAlt className="text-xs" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;
