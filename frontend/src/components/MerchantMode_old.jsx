import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { useCelo } from '../context/CeloContext';

const MerchantMode = () => {
  const { address } = useCelo();
  const [amount, setAmount] = useState('');
  const [reference, setReference] = useState('');
  const [showQR, setShowQR] = useState(false);

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
    <div className="max-w-2xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Merchant Mode</h2>
        
        {!showQR ? (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount to Request (cUSD)
              </label>
              <input
                type="number"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full px-4 py-3 text-2xl border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description (Optional)
              </label>
              <input
                type="text"
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                placeholder="Product or service description"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[5, 10, 20, 50, 100, 200].map((preset) => (
                <button
                  key={preset}
                  onClick={() => setAmount(preset.toString())}
                  className="px-4 py-3 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  ${preset}
                </button>
              ))}
            </div>

            <button
              onClick={handleRequestPayment}
              className="w-full bg-green-600 text-white py-4 text-lg rounded-lg hover:bg-green-700 transition-colors"
            >
              Request Payment
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-center">
              <p className="text-gray-600 mb-2">Request for</p>
              <p className="text-4xl font-bold text-green-600 mb-4">
                ${parseFloat(amount).toFixed(2)} cUSD
              </p>
              {reference && (
                <p className="text-gray-700 mb-4">{reference}</p>
              )}
            </div>

            <div className="flex flex-col items-center">
              <div className="bg-white p-6 rounded-lg border-4 border-green-500 mb-4">
                <QRCodeSVG
                  value={generatePaymentData()}
                  size={300}
                  level="H"
                  includeMargin={true}
                />
              </div>
              <p className="text-sm text-gray-600 text-center mb-6">
                Customer can scan this QR code to pay
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={handleNewRequest}
                className="px-4 py-3 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition-colors"
              >
                New Request
              </button>
              <button
                onClick={() => window.print()}
                className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Print QR
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-yellow-800 mb-2">Merchant Tips</h3>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>• Use preset amounts for faster checkout</li>
          <li>• Add descriptions to help customers identify their purchases</li>
          <li>• You can print QR codes for fixed-price items</li>
        </ul>
      </div>
    </div>
  );
};

export default MerchantMode;
