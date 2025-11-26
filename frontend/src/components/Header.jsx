import React from 'react';
import { useCelo } from '../context/CeloContext';

const Header = () => {
  const { address, connected, connectWallet, disconnectWallet, cUSDBalance } = useCelo();

  const formatAddress = (addr) => {
    if (!addr) return '';
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

  return (
    <header className="bg-yellow-400 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">CeloTap</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            {connected ? (
              <>
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-semibold text-gray-900">
                    {parseFloat(cUSDBalance).toFixed(2)} cUSD
                  </p>
                  <p className="text-xs text-gray-700">{formatAddress(address)}</p>
                </div>
                <button
                  onClick={disconnectWallet}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Disconnect
                </button>
              </>
            ) : (
              <button
                onClick={connectWallet}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
