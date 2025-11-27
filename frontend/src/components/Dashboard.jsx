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
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 space-y-16">
        {/* Hero Section */}
        <div className="text-center space-y-8">
          <div className="flex justify-center">
            <div className="w-24 h-24 bg-gradient-celo rounded-full flex items-center justify-center shadow-glow animate-pulse">
              <FaWallet className="text-5xl text-celo-dark" />
            </div>
          </div>
          <h1 className="text-6xl md:text-7xl font-bold gradient-text">
            Welcome to CeloTap
          </h1>
          <p className="text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            The simplest way to send and receive cryptocurrency payments.
            <br />
            <span className="text-celo-primary">No complexity. Just payments.</span>
          </p>
          <div className="flex items-center justify-center space-x-3 text-celo-primary text-lg">
            <IoSparkles className="text-2xl" />
            <span className="font-semibold">Fast • Secure • Decentralized</span>
            <IoSparkles className="text-2xl" />
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="glass-effect rounded-2xl p-8 border border-celo-primary/30 card-hover text-center space-y-4">
            <div className="w-16 h-16 bg-gradient-celo rounded-2xl flex items-center justify-center mx-auto shadow-glow">
              <FaPaperPlane className="text-3xl text-celo-dark" />
            </div>
            <h3 className="text-2xl font-bold text-white">Instant Payments</h3>
            <p className="text-gray-400">
              Send CELO and cUSD to anyone in seconds. Just enter an address or scan a QR code.
            </p>
          </div>

          <div className="glass-effect rounded-2xl p-8 border border-celo-green/30 card-hover text-center space-y-4">
            <div className="w-16 h-16 bg-gradient-to-br from-celo-green to-celo-forest rounded-2xl flex items-center justify-center mx-auto shadow-lg">
              <FaQrcode className="text-3xl text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white">QR Payments</h3>
            <p className="text-gray-400">
              Generate QR codes for receiving payments. Perfect for in-person transactions.
            </p>
          </div>

          <div className="glass-effect rounded-2xl p-8 border border-celo-purple/30 card-hover text-center space-y-4">
            <div className="w-16 h-16 bg-gradient-purple rounded-2xl flex items-center justify-center mx-auto shadow-lg">
              <FaStore className="text-3xl text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white">Merchant Mode</h3>
            <p className="text-gray-400">
              Accept payments with preset amounts. Ideal for businesses and merchants.
            </p>
          </div>
        </div>

        {/* How It Works */}
        <div className="glass-effect rounded-3xl p-12 border border-celo-primary/20">
          <h2 className="text-4xl font-bold text-center gradient-text mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-12 h-12 bg-celo-primary text-celo-dark rounded-full flex items-center justify-center text-2xl font-bold mx-auto">
                1
              </div>
              <h3 className="text-xl font-bold text-white">Connect Wallet</h3>
              <p className="text-gray-400">
                Connect your MetaMask or Valora wallet to get started in seconds
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-12 h-12 bg-celo-green text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto">
                2
              </div>
              <h3 className="text-xl font-bold text-white">Choose Action</h3>
              <p className="text-gray-400">
                Send payments, receive with QR codes, or use merchant mode
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-12 h-12 bg-celo-purple text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto">
                3
              </div>
              <h3 className="text-xl font-bold text-white">Done!</h3>
              <p className="text-gray-400">
                Your payment is confirmed on the blockchain in ~5 seconds
              </p>
            </div>
          </div>
        </div>

        {/* Why CeloTap */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="glass-effect rounded-2xl p-8 border border-white/20 space-y-6">
            <h3 className="text-3xl font-bold gradient-text">Why CeloTap?</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <IoSparkles className="text-celo-primary text-xl flex-shrink-0 mt-1" />
                <div>
                  <p className="text-white font-semibold">Lightning Fast</p>
                  <p className="text-gray-400 text-sm">Transactions confirm in ~5 seconds</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <IoSparkles className="text-celo-green text-xl flex-shrink-0 mt-1" />
                <div>
                  <p className="text-white font-semibold">Ultra Low Fees</p>
                  <p className="text-gray-400 text-sm">Pay fractions of a cent per transaction</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <IoSparkles className="text-celo-purple text-xl flex-shrink-0 mt-1" />
                <div>
                  <p className="text-white font-semibold">Mobile-First</p>
                  <p className="text-gray-400 text-sm">Designed for smartphones and mobile wallets</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <IoSparkles className="text-celo-primary text-xl flex-shrink-0 mt-1" />
                <div>
                  <p className="text-white font-semibold">Non-Custodial</p>
                  <p className="text-gray-400 text-sm">You control your funds, always</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="glass-effect rounded-2xl p-8 border border-white/20 space-y-6">
            <h3 className="text-3xl font-bold gradient-text">Built on Celo</h3>
            <p className="text-gray-400 leading-relaxed">
              CeloTap is powered by the Celo blockchain, a carbon-negative, mobile-first platform designed for real-world payments.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="text-center p-4 bg-white/5 rounded-xl">
                <p className="text-3xl font-bold text-celo-primary">~5s</p>
                <p className="text-sm text-gray-400 mt-1">Block Time</p>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-xl">
                <p className="text-3xl font-bold text-celo-green">$0.001</p>
                <p className="text-sm text-gray-400 mt-1">Avg Fee</p>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-xl">
                <p className="text-3xl font-bold text-celo-purple">100%</p>
                <p className="text-sm text-gray-400 mt-1">Uptime</p>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-xl">
                <p className="text-3xl font-bold gradient-text">🌱</p>
                <p className="text-sm text-gray-400 mt-1">Carbon Negative</p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="glass-effect rounded-3xl p-12 border border-celo-primary/30 text-center space-y-6">
          <h2 className="text-4xl font-bold gradient-text">
            Ready to Start?
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Connect your wallet and experience the future of mobile payments
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="px-8 py-4 bg-gradient-celo text-celo-dark font-bold rounded-xl shadow-glow hover:shadow-glow-green transition-all duration-300 transform hover:scale-105 text-lg"
            >
              Connect Wallet
            </button>
            <a
              href="https://faucet.celo.org"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 glass-effect border border-celo-primary/50 text-celo-primary font-semibold rounded-xl hover:bg-white/10 transition-all duration-300 text-lg"
            >
              Get Test Tokens
            </a>
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
