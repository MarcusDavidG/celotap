import React from 'react';
import { useCelo } from '../context/CeloContext';
import { useTheme } from '../context/ThemeContext';
import { FaWallet, FaPowerOff, FaMoon, FaSun } from 'react-icons/fa';
import { RiCopperCoinFill } from 'react-icons/ri';

const Header = () => {
  const { address, connected, connectWallet, disconnectWallet, cUSDBalance, balance } = useCelo();
  const { theme, toggleTheme } = useTheme();

  const formatAddress = (addr) => {
    if (!addr) return '';
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

  return (
    <header className="glass-effect border-b border-celo-primary/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-celo rounded-full flex items-center justify-center shadow-glow">
              <RiCopperCoinFill className="text-2xl text-celo-dark" />
            </div>
            <div>
              <h1 className="text-2xl font-bold gradient-text">CeloTap</h1>
              <p className="text-xs text-gray-400">Instant Crypto Payments</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-3 glass-effect rounded-lg border border-white/20 hover:border-celo-primary/50 transition-all duration-300 group"
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? (
                <FaSun className="text-celo-primary group-hover:rotate-180 transition-transform duration-500" />
              ) : (
                <FaMoon className="text-celo-primary group-hover:-rotate-12 transition-transform duration-300" />
              )}
            </button>

            {connected ? (
              <>
                <div className="hidden sm:flex flex-col items-end glass-effect px-4 py-2 rounded-lg">
                  <div className="flex items-center space-x-2 text-sm">
                    <span className="text-celo-primary font-bold">{parseFloat(balance).toFixed(4)}</span>
                    <span className="text-gray-400">CELO</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-gray-400">
                    <span>{parseFloat(cUSDBalance).toFixed(2)} cUSD</span>
                    <span>•</span>
                    <span>{formatAddress(address)}</span>
                  </div>
                </div>
                <button
                  onClick={disconnectWallet}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-400 rounded-lg transition-all duration-300"
                >
                  <FaPowerOff />
                  <span className="hidden sm:inline">Disconnect</span>
                </button>
              </>
            ) : (
              <button
                onClick={connectWallet}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-celo text-celo-dark font-semibold rounded-lg shadow-glow hover:shadow-glow-green transition-all duration-300 transform hover:scale-105"
              >
                <FaWallet />
                <span>Connect Wallet</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
