import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { useCelo } from '../context/CeloContext';
import { FaQrcode, FaCopy, FaCheckCircle } from 'react-icons/fa';
import { IoSparkles } from 'react-icons/io5';

const ReceivePayment = () => {
  const { address } = useCelo();
  const [amount, setAmount] = useState('');
  const [reference, setReference] = useState('');
  const [copied, setCopied] = useState(false);

  const generatePaymentData = () => {
    const data = {
      address,
      amount: amount || undefined,
      reference: reference || undefined,
    };
    return JSON.stringify(data);
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="glass-effect rounded-2xl p-8 border border-celo-green/30">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold gradient-text mb-2">Receive Payment</h2>
            <p className="text-gray-400 text-sm">Generate QR code to receive crypto</p>
          </div>
          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
            <FaQrcode className="text-xl text-white" />
          </div>
        </div>

        <div className="space-y-8">
          {/* QR Code Display */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-celo rounded-2xl blur-xl opacity-30 animate-pulse" />
              <div className="relative bg-white p-8 rounded-2xl shadow-glow">
                <QRCodeSVG
                  value={generatePaymentData()}
                  size={280}
                  level="H"
                  includeMargin={false}
                />
              </div>
            </div>
            <div className="flex items-center space-x-2 mt-4 text-gray-400">
              <IoSparkles className="text-celo-primary" />
              <p className="text-sm">Scan to pay with any Web3 wallet</p>
              <IoSparkles className="text-celo-primary" />
            </div>
          </div>

          {/* Address Display */}
          <div className="glass-effect rounded-xl p-4 border border-white/20">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Your Wallet Address
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={address || ''}
                readOnly
                className="flex-1 px-4 py-3 glass-effect rounded-lg border border-white/10 text-white text-sm font-mono"
              />
              <button
                onClick={copyAddress}
                className={`px-4 py-3 rounded-lg font-semibold transition-all flex items-center space-x-2 ${
                  copied
                    ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                    : 'bg-celo-primary/20 text-celo-primary border border-celo-primary/50 hover:bg-celo-primary/30'
                }`}
              >
                {copied ? (
                  <>
                    <FaCheckCircle />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <FaCopy />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Optional Fields */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Request Amount (Optional)
              </label>
              <input
                type="number"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full px-4 py-3 glass-effect rounded-xl border border-white/20 focus:border-celo-green focus:ring-2 focus:ring-celo-green/50 transition-all text-white placeholder-gray-500"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Payment Reference (Optional)
              </label>
              <input
                type="text"
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                placeholder="Payment for..."
                className="w-full px-4 py-3 glass-effect rounded-xl border border-white/20 focus:border-celo-green focus:ring-2 focus:ring-celo-green/50 transition-all text-white placeholder-gray-500"
              />
            </div>
          </div>

          {/* Info Banner */}
          <div className="glass-effect rounded-xl p-4 border border-celo-green/20">
            <p className="text-sm text-gray-400 text-center">
              ✨ QR code updates in real-time when you add amount or reference
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceivePayment;
