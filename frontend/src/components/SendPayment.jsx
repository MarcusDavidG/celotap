import React, { useState } from 'react';
import { useCelo } from '../context/CeloContext';
import { ethers } from 'ethers';

const SendPayment = () => {
  const { kit, address, updateBalances, cUSDBalance } = useCelo();
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [reference, setReference] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSend = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (!kit || !address) {
        throw new Error('Please connect your wallet first');
      }

      if (!ethers.utils.isAddress(recipient)) {
        throw new Error('Invalid recipient address');
      }

      const amountInWei = ethers.utils.parseEther(amount);
      
      if (parseFloat(amount) > parseFloat(cUSDBalance)) {
        throw new Error('Insufficient cUSD balance');
      }

      const cUSDAddress = import.meta.env.VITE_CUSD_ADDRESS || '0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1';
      const stableToken = await kit.contracts.getStableToken(cUSDAddress);
      
      const tx = await stableToken.transfer(recipient, amountInWei.toString()).send({
        from: address,
        gasPrice: '1000000000',
      });

      await tx.waitReceipt();

      setSuccess(`Payment sent successfully! Tx: ${tx.transactionHash}`);
      setRecipient('');
      setAmount('');
      setReference('');
      
      await updateBalances();
    } catch (err) {
      console.error('Payment error:', err);
      setError(err.message || 'Failed to send payment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Payment</h2>
        
        <form onSubmit={handleSend} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Recipient Address
            </label>
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="0x..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount (cUSD)
            </label>
            <input
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
            <p className="text-sm text-gray-500 mt-1">
              Available: {parseFloat(cUSDBalance).toFixed(2)} cUSD
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reference (Optional)
            </label>
            <input
              type="text"
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              placeholder="Payment for..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-green-800 text-sm">{success}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Sending...' : 'Send Payment'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SendPayment;
