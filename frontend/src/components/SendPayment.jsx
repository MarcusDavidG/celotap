import React, { useState } from 'react';
import { useCelo } from '../context/CeloContext';
import { ethers } from 'ethers';
import toast from 'react-hot-toast';
import { FaPaperPlane, FaQrcode, FaAddressBook } from 'react-icons/fa';
import { RiCopperCoinFill } from 'react-icons/ri';
import { IoSparkles } from 'react-icons/io5';
import { usePrices } from '../hooks/usePrices';
import QRScanner from './QRScanner';
import AddressBook from './AddressBook';

const SendPayment = () => {
  const { kit, address, updateBalances, cUSDBalance, balance } = useCelo();
  const { formatUSD } = usePrices();
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [reference, setReference] = useState('');
  const [token, setToken] = useState('CELO');
  const [loading, setLoading] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [showAddressBook, setShowAddressBook] = useState(false);

  const handleScanComplete = (scannedAddress) => {
    setRecipient(scannedAddress);
    setShowScanner(false);
    toast.success('Address scanned successfully!');
  };

  const handleAddressSelect = (selectedAddress) => {
    setRecipient(selectedAddress);
    setShowAddressBook(false);
    toast.success('Address selected from address book!');
  };

  const handleSend = async (e) => {
    e.preventDefault();
    setLoading(true);

    const loadingToast = toast.loading('Sending payment...');

    try {
      if (!kit || !address) {
        throw new Error('Please connect your wallet first');
      }

      if (!ethers.utils.isAddress(recipient)) {
        throw new Error('Invalid recipient address');
      }

      const amountInWei = ethers.utils.parseEther(amount);
      const availableBalance = token === 'CELO' ? balance : cUSDBalance;
      
      if (parseFloat(amount) > parseFloat(availableBalance)) {
        throw new Error(`Insufficient ${token} balance`);
      }

      let tx;
      
      if (token === 'CELO') {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        
        tx = await signer.sendTransaction({
          to: recipient,
          value: amountInWei,
        });
        
        await tx.wait();
        setSuccess(`Payment sent successfully! Tx: ${tx.hash}`);
      } else {
        const cUSDAddress = import.meta.env.VITE_CUSD_ADDRESS || '0xEF4d55D6dE8e8d73232827Cd1e9b2F2dBb45bC80';
        const stableToken = await kit.contracts.getStableToken(cUSDAddress);
        
        tx = await stableToken.transfer(recipient, amountInWei.toString()).send({
          from: address,
          gasPrice: '1000000000',
        });

        await tx.waitReceipt();
        toast.success(`Payment sent successfully! Tx: ${tx.transactionHash?.substring(0, 10)}...`, {
          duration: 6000,
        });
      }

      setRecipient('');
      setAmount('');
      setReference('');
      
      await updateBalances();
      toast.dismiss(loadingToast);
    } catch (err) {
      console.error('Payment error:', err);
      toast.dismiss(loadingToast);
      toast.error(err.message || 'Failed to send payment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="glass-effect rounded-2xl p-8 border border-celo-primary/30">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold gradient-text mb-2">Send Payment</h2>
            <p className="text-gray-400 text-sm">Transfer crypto to any address instantly</p>
          </div>
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <FaPaperPlane className="text-xl text-white" />
          </div>
        </div>

        <form onSubmit={handleSend} className="space-y-6">
          {/* Token Selector */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Select Token
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setToken('CELO')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  token === 'CELO'
                    ? 'border-celo-primary bg-celo-primary/20 shadow-glow'
                    : 'border-white/20 bg-white/5 hover:border-white/40'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <RiCopperCoinFill className="text-2xl text-celo-primary" />
                    <div className="text-left">
                      <p className="font-semibold text-white">CELO</p>
                      <p className="text-xs text-gray-400">Native Token</p>
                    </div>
                  </div>
                  {token === 'CELO' && <IoSparkles className="text-celo-primary" />}
                </div>
                <p className="text-right text-sm text-gray-400 mt-2">
                  {parseFloat(balance).toFixed(4)} available
                </p>
              </button>

              <button
                type="button"
                onClick={() => setToken('cUSD')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  token === 'cUSD'
                    ? 'border-celo-green bg-celo-green/20 shadow-glow-green'
                    : 'border-white/20 bg-white/5 hover:border-white/40'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-celo-green rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">$</span>
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-white">cUSD</p>
                      <p className="text-xs text-gray-400">Stablecoin</p>
                    </div>
                  </div>
                  {token === 'cUSD' && <IoSparkles className="text-celo-green" />}
                </div>
                <p className="text-right text-sm text-gray-400 mt-2">
                  {parseFloat(cUSDBalance).toFixed(2)} available
                </p>
              </button>
            </div>
          </div>

          {/* Recipient Address */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Recipient Address
            </label>
            <div className="relative">
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="0x..."
                className="w-full px-4 py-3 pr-24 glass-effect rounded-xl border border-white/20 focus:border-celo-primary focus:ring-2 focus:ring-celo-primary/50 transition-all text-white placeholder-gray-500"
                required
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-1">
                <button
                  type="button"
                  onClick={() => setShowAddressBook(true)}
                  className="p-2 bg-celo-green/20 hover:bg-celo-green/30 text-celo-green rounded-lg transition-colors"
                  title="Address Book"
                >
                  <FaAddressBook className="text-xl" />
                </button>
                <button
                  type="button"
                  onClick={() => setShowScanner(true)}
                  className="p-2 bg-celo-primary/20 hover:bg-celo-primary/30 text-celo-primary rounded-lg transition-colors"
                  title="Scan QR Code"
                >
                  <FaQrcode className="text-xl" />
                </button>
              </div>
            </div>
          </div>

          {/* Amount */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Amount ({token})
            </label>
            <div className="relative">
              <input
                type="number"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full px-4 py-3 glass-effect rounded-xl border border-white/20 focus:border-celo-primary focus:ring-2 focus:ring-celo-primary/50 transition-all text-white placeholder-gray-500"
                required
              />
              <button
                type="button"
                onClick={() => setAmount(token === 'CELO' ? balance : cUSDBalance)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs px-3 py-1 bg-celo-primary/20 text-celo-primary rounded-lg hover:bg-celo-primary/30 transition-colors"
              >
                MAX
              </button>
            </div>
            {amount && parseFloat(amount) > 0 && (
              <p className="text-sm text-gray-400 mt-2">
                ≈ {formatUSD(parseFloat(amount), token)}
              </p>
            )}
          </div>

          {/* Reference */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Reference (Optional)
            </label>
            <input
              type="text"
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              placeholder="Payment for..."
              className="w-full px-4 py-3 glass-effect rounded-xl border border-white/20 focus:border-celo-primary focus:ring-2 focus:ring-celo-primary/50 transition-all text-white placeholder-gray-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-gradient-celo text-celo-dark font-bold rounded-xl shadow-glow hover:shadow-glow-green disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center space-x-2"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-celo-dark border-t-transparent rounded-full animate-spin" />
                <span>Sending...</span>
              </>
            ) : (
              <>
                <FaPaperPlane />
                <span>Send Payment</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* QR Scanner Modal */}
      {showScanner && (
        <QRScanner
          onScan={handleScanComplete}
          onClose={() => setShowScanner(false)}
        />
      )}

      {/* Address Book Modal */}
      {showAddressBook && (
        <AddressBook
          onSelect={handleAddressSelect}
          onClose={() => setShowAddressBook(false)}
        />
      )}
    </div>
  );
};

export default SendPayment;
