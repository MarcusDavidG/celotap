import React, { createContext, useContext, useState, useEffect } from 'react';
import { newKit } from '@celo/contractkit';
import { ethers } from 'ethers';

const CeloContext = createContext();

export const useCelo = () => {
  const context = useContext(CeloContext);
  if (!context) {
    throw new Error('useCelo must be used within a CeloProvider');
  }
  return context;
};

export const CeloProvider = ({ children }) => {
  const [kit, setKit] = useState(null);
  const [address, setAddress] = useState(null);
  const [connected, setConnected] = useState(false);
  const [balance, setBalance] = useState('0');
  const [cUSDBalance, setCUSDBalance] = useState('0');

  const connectWallet = async () => {
    try {
      if (typeof window.ethereum !== 'undefined') {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const userAddress = await signer.getAddress();
        
        const celoKit = newKit(import.meta.env.VITE_CELO_RPC_URL || 'https://forno.celo-sepolia.celo-testnet.org');
        celoKit.defaultAccount = userAddress;
        
        setKit(celoKit);
        setAddress(userAddress);
        setConnected(true);
        
        await updateBalances(celoKit, userAddress);
        
        return { success: true, address: userAddress };
      } else {
        throw new Error('Please install MetaMask or Valora wallet');
      }
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      return { success: false, error: error.message };
    }
  };

  const updateBalances = async (celoKit, userAddress) => {
    try {
      const celoBalance = await celoKit.getTotalBalance(userAddress);
      setBalance(ethers.utils.formatEther(celoBalance.CELO.toString()));
      
      const cUSDAddress = import.meta.env.VITE_CUSD_ADDRESS || '0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1';
      const stableToken = await celoKit.contracts.getStableToken(cUSDAddress);
      const cUSDBalanceWei = await stableToken.balanceOf(userAddress);
      setCUSDBalance(ethers.utils.formatEther(cUSDBalanceWei.toString()));
    } catch (error) {
      console.error('Failed to fetch balances:', error);
    }
  };

  const disconnectWallet = () => {
    setKit(null);
    setAddress(null);
    setConnected(false);
    setBalance('0');
    setCUSDBalance('0');
  };

  const switchToSepolia = async () => {
    try {
      const chainId = import.meta.env.VITE_CHAIN_ID || '11142220';
      const chainIdHex = '0x' + parseInt(chainId).toString(16);
      
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [{
          chainId: chainIdHex,
          chainName: 'Celo Sepolia Testnet',
          nativeCurrency: {
            name: 'CELO',
            symbol: 'CELO',
            decimals: 18
          },
          rpcUrls: [import.meta.env.VITE_CELO_RPC_URL || 'https://forno.celo-sepolia.celo-testnet.org'],
          blockExplorerUrls: ['https://celo-sepolia.blockscout.com/']
        }]
      });
    } catch (error) {
      console.error('Failed to switch network:', error);
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      // Handle account changes - disconnect if user switches/removes account
      const handleAccountsChanged = (accounts) => {
        if (accounts.length === 0) {
          // User disconnected wallet
          disconnectWallet();
        } else if (connected && accounts[0] !== address) {
          // User switched account while connected
          disconnectWallet();
        }
      };

      // Handle network changes
      const handleChainChanged = () => {
        // Only disconnect, don't auto-reconnect
        if (connected) {
          disconnectWallet();
        }
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);

      // Cleanup listeners
      return () => {
        if (window.ethereum.removeListener) {
          window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
          window.ethereum.removeListener('chainChanged', handleChainChanged);
        }
      };
    }
  }, [connected, address]);

  const value = {
    kit,
    address,
    connected,
    balance,
    cUSDBalance,
    connectWallet,
    disconnectWallet,
    updateBalances: () => updateBalances(kit, address),
    switchToSepolia,
  };

  return <CeloContext.Provider value={value}>{children}</CeloContext.Provider>;
};
