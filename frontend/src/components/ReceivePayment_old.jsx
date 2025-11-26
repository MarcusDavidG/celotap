import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { useCelo } from '../context/CeloContext';

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
    <div className="max-w-2xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Receive Payment</h2>
        
        <div className="space-y-6">
          <div className="flex flex-col items-center">
            <div className="bg-white p-6 rounded-lg border-4 border-gray-200 mb-4">
              <QRCodeSVG
                value={generatePaymentData()}
                size={256}
                level="H"
                includeMargin={true}
              />
            </div>
            <p className="text-sm text-gray-600 text-center">
              Scan this QR code to send payment
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Address
            </label>
            <div className="flex">
              <input
                type="text"
                value={address || ''}
                readOnly
                className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg bg-gray-50"
              />
              <button
                onClick={copyAddress}
                className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition-colors"
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Request Amount (Optional)
            </label>
            <input
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00 cUSD"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payment Reference (Optional)
            </label>
            <input
              type="text"
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              placeholder="Payment for..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceivePayment;
