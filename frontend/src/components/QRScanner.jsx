import React, { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { FaCamera, FaTimes, FaCheckCircle } from 'react-icons/fa';

const QRScanner = ({ onScan, onClose }) => {
  const scannerRef = useRef(null);
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!scannerRef.current) return;

    const scanner = new Html5QrcodeScanner(
      'qr-reader',
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0,
      },
      false
    );

    const onScanSuccess = (decodedText) => {
      setScanning(true);
      scanner.clear();
      
      // Extract address from QR code (might be a full payment URL or just an address)
      let address = decodedText;
      
      // Handle Celo payment URIs like celo:0x123...
      if (decodedText.includes(':')) {
        const parts = decodedText.split(':');
        if (parts.length > 1) {
          address = parts[1].split('?')[0]; // Get address part before query params
        }
      }
      
      // Handle JSON format
      try {
        const data = JSON.parse(decodedText);
        if (data.address) {
          address = data.address;
        }
      } catch (e) {
        // Not JSON, use as-is
      }

      onScan(address);
    };

    const onScanError = (err) => {
      // Ignore common camera errors during scanning
      if (err && !err.toString().includes('NotFoundException')) {
        console.warn('QR scan error:', err);
      }
    };

    scanner.render(onScanSuccess, onScanError);

    return () => {
      try {
        scanner.clear();
      } catch (e) {
        // Scanner might already be cleared
      }
    };
  }, [onScan]);

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="glass-effect rounded-3xl p-8 max-w-2xl w-full border border-celo-primary/30">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-celo rounded-xl flex items-center justify-center shadow-glow">
              <FaCamera className="text-2xl text-celo-dark" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">Scan QR Code</h3>
              <p className="text-sm text-gray-400">Point camera at payment QR code</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-3 hover:bg-white/10 rounded-lg transition-colors"
          >
            <FaTimes className="text-2xl text-gray-400 hover:text-white" />
          </button>
        </div>

        {/* Scanner */}
        <div
          ref={scannerRef}
          id="qr-reader"
          className="w-full rounded-2xl overflow-hidden"
        />

        {/* Status Messages */}
        {scanning && (
          <div className="mt-6 flex items-center justify-center space-x-3 p-4 bg-green-500/20 border border-green-500/50 rounded-xl">
            <FaCheckCircle className="text-green-400 text-xl" />
            <p className="text-green-400 font-semibold">QR Code detected!</p>
          </div>
        )}

        {error && (
          <div className="mt-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {/* Instructions */}
        <div className="mt-6 space-y-3 text-sm text-gray-400">
          <p className="flex items-start space-x-2">
            <span className="text-celo-primary">•</span>
            <span>Allow camera access when prompted</span>
          </p>
          <p className="flex items-start space-x-2">
            <span className="text-celo-primary">•</span>
            <span>Hold camera steady and ensure QR code is within frame</span>
          </p>
          <p className="flex items-start space-x-2">
            <span className="text-celo-primary">•</span>
            <span>Make sure there's enough light</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default QRScanner;
