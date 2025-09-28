import React, { useState } from 'react';
import { paymentService } from '../services';

const QRGenerator = () => {
  const [qrData, setQrData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [paymentData, setPaymentData] = useState({
    amount: 100,
    currency: 'USD',
    description: 'Hotel Booking Payment',
    bookingId: 'booking-123'
  });

  const [bookingData, setBookingData] = useState({
    totalAmount: 250,
    currency: 'USD',
    hotelName: 'Grand Hotel',
    bookingId: 'booking-456',
    customerName: 'John Doe',
    checkIn: '2024-01-15',
    checkOut: '2024-01-17'
  });

  const generateQR = async (method) => {
    setLoading(true);
    setError(null);
    setQrData(null);

    try {
      let result;
      
      switch (method) {
        case 'basic':
          result = await paymentService.generateQRImage(paymentData);
          break;
        case 'direct':
          result = await paymentService.generateQRImageDirect(paymentData);
          break;
        case 'amount':
          result = await paymentService.generateQRForAmount(
            paymentData.amount, 
            paymentData.currency, 
            paymentData.description
          );
          break;
        case 'booking':
          result = await paymentService.generateQRForBooking(bookingData);
          break;
        default:
          throw new Error('Invalid method');
      }
      
      setQrData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const copyQRCode = () => {
    if (qrData?.qr_code) {
      navigator.clipboard.writeText(qrData.qr_code);
      alert('QR code data copied to clipboard!');
    }
  };

  const downloadQRCode = () => {
    if (qrData?.qr_code) {
      const link = document.createElement('a');
      link.href = qrData.qr_code;
      link.download = `qr-code-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">QR Code Generator for Payments</h1>
      
      {/* Payment Data Configuration */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Basic Payment Data */}
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Basic Payment Data</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Amount</label>
              <input
                type="number"
                value={paymentData.amount}
                onChange={(e) => setPaymentData(prev => ({ ...prev, amount: parseFloat(e.target.value) }))}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Enter amount"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Currency</label>
              <select
                value={paymentData.currency}
                onChange={(e) => setPaymentData(prev => ({ ...prev, currency: e.target.value }))}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="USD">USD</option>
                <option value="KHR">KHR</option>
                <option value="EUR">EUR</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <input
                type="text"
                value={paymentData.description}
                onChange={(e) => setPaymentData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Payment description"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Booking ID</label>
              <input
                type="text"
                value={paymentData.bookingId}
                onChange={(e) => setPaymentData(prev => ({ ...prev, bookingId: e.target.value }))}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Booking ID"
              />
            </div>
          </div>
        </div>

        {/* Booking Data */}
        <div className="bg-blue-100 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Booking Data</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Total Amount</label>
              <input
                type="number"
                value={bookingData.totalAmount}
                onChange={(e) => setBookingData(prev => ({ ...prev, totalAmount: parseFloat(e.target.value) }))}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Hotel Name</label>
              <input
                type="text"
                value={bookingData.hotelName}
                onChange={(e) => setBookingData(prev => ({ ...prev, hotelName: e.target.value }))}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Customer Name</label>
              <input
                type="text"
                value={bookingData.customerName}
                onChange={(e) => setBookingData(prev => ({ ...prev, customerName: e.target.value }))}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-sm font-medium mb-1">Check In</label>
                <input
                  type="date"
                  value={bookingData.checkIn}
                  onChange={(e) => setBookingData(prev => ({ ...prev, checkIn: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Check Out</label>
                <input
                  type="date"
                  value={bookingData.checkOut}
                  onChange={(e) => setBookingData(prev => ({ ...prev, checkOut: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Generate QR Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <button
          onClick={() => generateQR('basic')}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          Generate Basic QR
        </button>
        <button
          onClick={() => generateQR('direct')}
          disabled={loading}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
        >
          Generate Direct QR
        </button>
        <button
          onClick={() => generateQR('amount')}
          disabled={loading}
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 disabled:opacity-50"
        >
          Generate Amount QR
        </button>
        <button
          onClick={() => generateQR('booking')}
          disabled={loading}
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 disabled:opacity-50"
        >
          Generate Booking QR
        </button>
      </div>

      {/* Loading Indicator */}
      {loading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <p className="mt-2 text-gray-600">Generating QR code...</p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* QR Code Display */}
      {qrData && (
        <div className="bg-white border rounded-lg p-6 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Generated QR Code</h2>
            <div className="space-x-2">
              <button
                onClick={copyQRCode}
                className="bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-600"
              >
                Copy Data
              </button>
              <button
                onClick={downloadQRCode}
                className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
              >
                Download
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* QR Code Image */}
            <div className="text-center">
              {qrData.qr_code && (
                <img
                  src={qrData.qr_code}
                  alt="Payment QR Code"
                  className="mx-auto border rounded-lg shadow-md"
                  style={{ maxWidth: '300px', maxHeight: '300px' }}
                />
              )}
            </div>
            
            {/* QR Code Data */}
            <div>
              <h3 className="font-semibold mb-2">QR Code Information</h3>
              <div className="space-y-2 text-sm">
                <p><strong>Transaction ID:</strong> {qrData.transaction_id || 'N/A'}</p>
                <p><strong>Amount:</strong> {qrData.amount || paymentData.amount}</p>
                <p><strong>Currency:</strong> {qrData.currency || paymentData.currency}</p>
                <p><strong>Description:</strong> {qrData.description || paymentData.description}</p>
                <p><strong>Status:</strong> {qrData.status || 'Generated'}</p>
                <p><strong>Generated At:</strong> {new Date().toLocaleString()}</p>
              </div>
            </div>
          </div>
          
          {/* Raw Data */}
          <details className="mt-4">
            <summary className="cursor-pointer font-semibold">View Raw Response Data</summary>
            <pre className="mt-2 p-3 bg-gray-100 rounded text-xs overflow-auto">
              {JSON.stringify(qrData, null, 2)}
            </pre>
          </details>
        </div>
      )}

      {/* API Information */}
      <div className="mt-8 bg-blue-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">QR Generation API Information</h3>
        <div className="text-sm text-gray-700 space-y-1">
          <p><strong>Endpoint:</strong> GET https://api.bakongcity.cityaba/generate-qr-image</p>
          <p><strong>Parameters:</strong> amount, currency, description, booking_id, secret</p>
          <p><strong>Secret Key:</strong> Automatically included in all requests</p>
          <p><strong>Response:</strong> QR code image data and transaction information</p>
        </div>
      </div>
    </div>
  );
};

export default QRGenerator;
