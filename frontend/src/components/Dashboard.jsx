import React from 'react';
import { useCelo } from '../context/CeloContext';
import { Link } from 'react-router-dom';
import { FaPaperPlane, FaQrcode, FaStore, FaWallet, FaCoins } from 'react-icons/fa';
import { IoSparkles } from 'react-icons/io5';
import { RiCopperCoinFill } from 'react-icons/ri';
import { usePrices } from '../hooks/usePrices';
import TransactionHistory from './TransactionHistory';

const Dashboard = () => {
  const { connected, address, cUSDBalance, balance } = useCelo();
  const { formatUSD } = usePrices();

  if (!connected) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center space-y-8">
          <div className="flex justify-center">
            <div className="w-24 h-24 bg-gradient-celo rounded-full flex items-center justify-center shadow-glow animate-pulse">
              <FaWallet className="text-5xl text-celo-dark" />
            </div>
          </div>
          <h2 className="text-5xl font-bold gradient-text">
            Welcome to CeloTap
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Connect your wallet to start making instant crypto payments on Celo blockchain
          </p>
          <div className="flex items-center justify-center space-x-2 text-celo-primary">
            <IoSparkles />
            <span className="text-sm">Fast • Secure • Decentralized</span>
            <IoSparkles />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* Welcome Section */}
      <div className="glass-effect rounded-2xl p-6 border border-celo-primary/30">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold gradient-text mb-2">Dashboard</h2>
            <p className="text-gray-400">Manage your crypto payments seamlessly</p>
          </div>
          <IoSparkles className="text-4xl text-celo-primary animate-pulse" />
        </div>
      </div>

      {/* Balance Cards */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="glass-effect rounded-2xl p-6 border border-celo-primary/30 card-hover">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-celo-primary/20 rounded-xl flex items-center justify-center">
              <RiCopperCoinFill className="text-2xl text-celo-primary" />
            </div>
            <span className="px-3 py-1 bg-celo-primary/20 text-celo-primary text-xs rounded-full">
              Native
            </span>
          </div>
          <h3 className="text-sm font-medium text-gray-400 mb-2">CELO Balance</h3>
          <p className="text-4xl font-bold text-celo-primary mb-1">
            {parseFloat(balance).toFixed(4)}
          </p>
          <p className="text-lg text-celo-primary/70 mb-2">
            ≈ {formatUSD(parseFloat(balance), 'CELO')}
          </p>
          <p className="text-sm text-gray-500">Native Token</p>
        </div>

        <div className="glass-effect rounded-2xl p-6 border border-celo-green/30 card-hover">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-celo-green/20 rounded-xl flex items-center justify-center">
              <FaCoins className="text-2xl text-celo-green" />
            </div>
            <span className="px-3 py-1 bg-celo-green/20 text-celo-green text-xs rounded-full">
              Stable
            </span>
          </div>
          <h3 className="text-sm font-medium text-gray-400 mb-2">cUSD Balance</h3>
          <p className="text-4xl font-bold text-celo-green mb-1">
            {parseFloat(cUSDBalance).toFixed(2)}
          </p>
          <p className="text-lg text-celo-green/70 mb-2">
            ≈ {formatUSD(parseFloat(cUSDBalance), 'cUSD')}
          </p>
          <p className="text-sm text-gray-500">Celo Dollar</p>
        </div>
      </div>

      {/* Action Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Link
          to="/send"
          className="glass-effect rounded-2xl p-6 border border-white/20 card-hover group"
        >
          <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <FaPaperPlane className="text-2xl text-white" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2 group-hover:gradient-text transition-all">
            Send Payment
          </h3>
          <p className="text-gray-400 text-sm">Send CELO or cUSD to any address instantly</p>
        </Link>

        <Link
          to="/receive"
          className="glass-effect rounded-2xl p-6 border border-white/20 card-hover group"
        >
          <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <FaQrcode className="text-2xl text-white" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2 group-hover:gradient-text transition-all">
            Receive Payment
          </h3>
          <p className="text-gray-400 text-sm">Generate QR code to receive payments</p>
        </Link>

        <Link
          to="/merchant"
          className="glass-effect rounded-2xl p-6 border border-white/20 card-hover group"
        >
          <div className="w-14 h-14 bg-gradient-purple rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <FaStore className="text-2xl text-white" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2 group-hover:gradient-text transition-all">
            Merchant Mode
          </h3>
          <p className="text-gray-400 text-sm">Quick payment requests for business</p>
        </Link>
      </div>

      {/* Transaction History */}
      <TransactionHistory address={address} />

      {/* Stats Banner */}
      <div className="glass-effect rounded-2xl p-6 border border-celo-primary/20">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-celo-primary">Fast</p>
            <p className="text-xs text-gray-400 mt-1">~5s Transactions</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-celo-green">Secure</p>
            <p className="text-xs text-gray-400 mt-1">Blockchain Verified</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-celo-purple">Low Fees</p>
            <p className="text-xs text-gray-400 mt-1">Minimal Gas Costs</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
