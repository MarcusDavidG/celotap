import React from 'react';
import { useCelo } from '../context/CeloContext';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { connected, address, cUSDBalance, balance } = useCelo();

  if (!connected) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Welcome to CeloTap
          </h2>
          <p className="text-gray-600 mb-8">
            Connect your wallet to start making stablecoin payments
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h2>
        <p className="text-gray-600">Manage your CeloTap payments</p>
      </div>

      <div className="grid gap-6 mb-8 md:grid-cols-2">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">cUSD Balance</h3>
          <p className="text-4xl font-bold text-green-600">
            {parseFloat(cUSDBalance).toFixed(2)}
          </p>
          <p className="text-sm text-gray-500 mt-2">Celo Dollar</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">CELO Balance</h3>
          <p className="text-4xl font-bold text-yellow-600">
            {parseFloat(balance).toFixed(4)}
          </p>
          <p className="text-sm text-gray-500 mt-2">Native Token</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Link
          to="/send"
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Send Payment</h3>
          <p className="text-gray-600">Send cUSD to any address or phone</p>
        </Link>

        <Link
          to="/receive"
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-4">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Receive Payment</h3>
          <p className="text-gray-600">Show QR code to receive cUSD</p>
        </Link>

        <Link
          to="/merchant"
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mb-4">
            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Merchant Mode</h3>
          <p className="text-gray-600">Quick payment requests for merchants</p>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
