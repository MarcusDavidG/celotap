import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { useCelo } from '../context/CeloContext';
import { FaStore, FaArrowLeft, FaPrint } from 'react-icons/fa';
import { IoSparkles } from 'react-icons/io5';
import { RiCopperCoinFill } from 'react-icons/ri';

const MerchantMode = () => {
  const { address } = useCelo();
  const [amount, setAmount] = useState('');
  const [reference, setReference] = useState('');
  const [showQR, setShowQR] = useState(false);

  const presetAmounts = [5, 10, 20, 50, 100, 200];

  const generatePaymentData = () => {
    const data = {
      address,
      amount: amount || undefined,
      reference: reference || undefined,
    };
    return JSON.stringify(data);
  };

  const handleRequestPayment = () => {
    if (!amount) {
      alert('Please enter an amount');
      return;
    }
    setShowQR(true);
  };

  const handleNewRequest = () => {
    setAmount('');
    setReference('');
    setShowQR(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="glass-effect rounded-2xl p-8 border border-celo-purple/30">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold gradient-text mb-2">Merchant Mode</h2>
            <p className="text-gray-400 text-sm">Quick payment requests for your business</p>
          </div>
          <div className="w-12 h-12 bg-gradient-purple rounded-xl flex items-center justify-center">
            <FaStore className="text-xl text-white" />
          </div>
        </div>

        {!showQR ? (
          <div className="space-y-6">
            {/* Amount Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Amount to Request
              </label>
              <div className="relative">
                <RiCopperCoinFill className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-celo-primary" />
                <input
                  type="number"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full pl-14 pr-4 py-4 text-3xl font-bold glass-effect rounded-xl border border-white/20 focus:border-celo-purple focus:ring-2 focus:ring-celo-purple/50 transition-all text-white placeholder-gray-500"
                  required
                />
              </div>
            </div>

            {/* Preset Amounts */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Quick Select
              </label>
              <div className="grid grid-cols-3 gap-3">
                {presetAmounts.map((preset) => (
                  <button
                    key={preset}
                    onClick={() => setAmount(preset.toString())}
                    className="px-4 py-3 glass-effect rounded-xl border border-white/20 hover:border-celo-primary hover:bg-celo-primary/10 transition-all font-semibold text-white"
                  >
                    ${preset}
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Description (Optional)
              </label>
              <input
                type="text"
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                placeholder="Product or service description..."
                className="w-full px-4 py-3 glass-effect rounded-xl border border-white/20 focus:border-celo-purple focus:ring-2 focus:ring-celo-purple/50 transition-all text-white placeholder-gray-500"
              />
            </div>

            {/* Request Button */}
            <button
              onClick={handleRequestPayment}
              className="w-full py-4 bg-gradient-purple text-white font-bold rounded-xl shadow-glow hover:scale-[1.02] transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <IoSparkles />
              <span>Generate Payment Request</span>
            </button>

            {/* Merchant Tips */}
            <div className="glass-effect rounded-xl p-4 border border-yellow-500/20">
              <h3 className="text-sm font-semibold text-yellow-400 mb-2 flex items-center space-x-2">
                <IoSparkles />
                <span>Merchant Tips</span>
              </h3>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>• Use preset amounts for faster checkout</li>
                <li>• Add descriptions to help customers identify purchases</li>
                <li>• Print QR codes for fixed-price items</li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Payment Request Display */}
            <div className="text-center space-y-4">
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-celo-purple/20 rounded-full">
                <span className="text-sm text-gray-400">Requesting</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <RiCopperCoinFill className="text-4xl text-celo-primary" />
                <p className="text-5xl font-bold gradient-text">
                  ${parseFloat(amount).toFixed(2)}
                </p>
              </div>
              {reference && (
                <p className="text-gray-400 text-lg">{reference}</p>
              )}
            </div>

            {/* QR Code */}
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-purple rounded-2xl blur-xl opacity-30 animate-pulse" />
                <div className="relative bg-white p-8 rounded-2xl shadow-glow">
                  <QRCodeSVG
                    value={generatePaymentData()}
                    size={320}
                    level="H"
                    includeMargin={false}
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2 mt-4 text-gray-400">
                <IoSparkles className="text-celo-purple" />
                <p className="text-sm">Customer can scan to pay</p>
                <IoSparkles className="text-celo-purple" />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={handleNewRequest}
                className="flex items-center justify-center space-x-2 px-4 py-3 glass-effect border border-white/20 rounded-xl hover:border-white/40 transition-all text-white"
              >
                <FaArrowLeft />
                <span>New Request</span>
              </button>
              <button
                onClick={() => window.print()}
                className="flex items-center justify-center space-x-2 px-4 py-3 bg-celo-primary/20 border border-celo-primary/50 text-celo-primary rounded-xl hover:bg-celo-primary/30 transition-all"
              >
                <FaPrint />
                <span>Print QR</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MerchantMode;
