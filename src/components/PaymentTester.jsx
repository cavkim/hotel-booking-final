import React, { useState } from 'react';
import { paymentService } from '../services';

const PaymentTester = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [paymentData, setPaymentData] = useState({
    amount: 100,
    currency: 'USD',
    description: 'Test Payment',
    bookingId: 'booking-123'
  });

  const addResult = (test, status, message, data = null) => {
    setResults(prev => [...prev, {
      id: Date.now(),
      test,
      status,
      message,
      data,
      timestamp: new Date().toLocaleTimeString()
    }]);
  };

  const clearResults = () => {
    setResults([]);
  };

  // Test QR Generation
  const testQRGeneration = async () => {
    setLoading(true);
    addResult('QR Generation', 'info', 'Testing QR code generation...');

    try {
      const qrData = await paymentService.generateQRImage(paymentData);
      addResult('QR Generation', 'success', 'QR code generated successfully', qrData);
    } catch (error) {
      addResult('QR Generation', 'error', error.message);
    } finally {
      setLoading(false);
    }
  };

  // Test QR Generation Direct
  const testQRGenerationDirect = async () => {
    setLoading(true);
    addResult('QR Generation Direct', 'info', 'Testing QR code generation with direct fetch...');

    try {
      const qrData = await paymentService.generateQRImageDirect(paymentData);
      addResult('QR Generation Direct', 'success', 'QR code generated successfully (direct)', qrData);
    } catch (error) {
      addResult('QR Generation Direct', 'error', error.message);
    } finally {
      setLoading(false);
    }
  };

  // Test QR Generation for Amount
  const testQRForAmount = async () => {
    setLoading(true);
    addResult('QR for Amount', 'info', 'Testing QR generation for specific amount...');

    try {
      const qrData = await paymentService.generateQRForAmount(
        paymentData.amount, 
        paymentData.currency, 
        paymentData.description
      );
      addResult('QR for Amount', 'success', 'QR code generated for amount', qrData);
    } catch (error) {
      addResult('QR for Amount', 'error', error.message);
    } finally {
      setLoading(false);
    }
  };

  // Test QR Generation for Booking
  const testQRForBooking = async () => {
    setLoading(true);
    addResult('QR for Booking', 'info', 'Testing QR generation for booking...');

    try {
      const bookingData = {
        totalAmount: paymentData.amount,
        currency: paymentData.currency,
        hotelName: 'Test Hotel',
        bookingId: paymentData.bookingId,
        customerName: 'Test Customer',
        checkIn: '2024-01-15',
        checkOut: '2024-01-17'
      };
      
      const qrData = await paymentService.generateQRForBooking(bookingData);
      addResult('QR for Booking', 'success', 'QR code generated for booking', qrData);
    } catch (error) {
      addResult('QR for Booking', 'error', error.message);
    } finally {
      setLoading(false);
    }
  };

  // Test Payment Processing
  const testPaymentProcessing = async () => {
    setLoading(true);
    addResult('Payment Processing', 'info', 'Testing payment processing...');

    try {
      const payment = await paymentService.processPayment(paymentData);
      addResult('Payment Processing', 'success', 'Payment processed successfully', payment);
    } catch (error) {
      addResult('Payment Processing', 'error', error.message);
    } finally {
      setLoading(false);
    }
  };

  // Test Callback Simulation
  const testCallbackSimulation = async () => {
    setLoading(true);
    addResult('Callback Simulation', 'info', 'Testing callback simulation...');

    try {
      const transactionId = 'txn-' + Date.now();
      const callbackResult = await paymentService.simulateCallback(transactionId, 'success');
      addResult('Callback Simulation', 'success', 'Callback simulated successfully', callbackResult);
    } catch (error) {
      addResult('Callback Simulation', 'error', error.message);
    } finally {
      setLoading(false);
    }
  };

  // Test Callback Simulation Direct
  const testCallbackSimulationDirect = async () => {
    setLoading(true);
    addResult('Callback Simulation Direct', 'info', 'Testing callback simulation with direct fetch...');

    try {
      const transactionId = 'txn-' + Date.now();
      const callbackResult = await paymentService.simulateCallbackDirect(transactionId, 'success');
      addResult('Callback Simulation Direct', 'success', 'Callback simulated successfully (direct)', callbackResult);
    } catch (error) {
      addResult('Callback Simulation Direct', 'error', error.message);
    } finally {
      setLoading(false);
    }
  };

  // Test Complete Payment Flow
  const testCompletePaymentFlow = async () => {
    setLoading(true);
    addResult('Complete Payment Flow', 'info', 'Testing complete payment flow...');

    try {
      // Step 1: Generate QR
      const qrData = await paymentService.generateQRImage(paymentData);
      addResult('Step 1: QR Generation', 'success', 'QR code generated', qrData);

      // Step 2: Process Payment
      const payment = await paymentService.processPayment({
        ...paymentData,
        qr_data: qrData
      });
      addResult('Step 2: Payment Processing', 'success', 'Payment processed', payment);

      // Step 3: Simulate Callback
      const callbackResult = await paymentService.simulateCallback(payment.transactionId || 'txn-123', 'success');
      addResult('Step 3: Callback Simulation', 'success', 'Callback simulated', callbackResult);

      addResult('Complete Payment Flow', 'success', 'Complete payment flow tested successfully!');
    } catch (error) {
      addResult('Complete Payment Flow', 'error', error.message);
    } finally {
      setLoading(false);
    }
  };

  // Test Payment Status
  const testPaymentStatus = async () => {
    setLoading(true);
    addResult('Payment Status', 'info', 'Testing payment status check...');

    try {
      const status = await paymentService.getPaymentStatus('test-payment-123');
      addResult('Payment Status', 'success', 'Payment status retrieved', status);
    } catch (error) {
      addResult('Payment Status', 'error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'success': return 'text-green-600 bg-green-100';
      case 'error': return 'text-red-600 bg-red-100';
      case 'info': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">ABA Payment Testing</h1>
      
      {/* Payment Data Configuration */}
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">Payment Data Configuration</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Amount</label>
            <input
              type="number"
              value={paymentData.amount}
              onChange={(e) => setPaymentData(prev => ({ ...prev, amount: parseFloat(e.target.value) }))}
              className="w-full px-3 py-2 border rounded-md"
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
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Booking ID</label>
            <input
              type="text"
              value={paymentData.bookingId}
              onChange={(e) => setPaymentData(prev => ({ ...prev, bookingId: e.target.value }))}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
        </div>
      </div>

      {/* Test Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
        <button
          onClick={testQRGeneration}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          Test QR Generation
        </button>
        <button
          onClick={testQRGenerationDirect}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          Test QR Direct
        </button>
        <button
          onClick={testQRForAmount}
          disabled={loading}
          className="bg-cyan-500 text-white px-4 py-2 rounded hover:bg-cyan-600 disabled:opacity-50"
        >
          Test QR Amount
        </button>
        <button
          onClick={testQRForBooking}
          disabled={loading}
          className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 disabled:opacity-50"
        >
          Test QR Booking
        </button>
        <button
          onClick={testPaymentProcessing}
          disabled={loading}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
        >
          Test Payment Processing
        </button>
        <button
          onClick={testCallbackSimulation}
          disabled={loading}
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 disabled:opacity-50"
        >
          Test Callback
        </button>
        <button
          onClick={testCallbackSimulationDirect}
          disabled={loading}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 disabled:opacity-50"
        >
          Test Callback Direct
        </button>
        <button
          onClick={testPaymentStatus}
          disabled={loading}
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 disabled:opacity-50"
        >
          Test Status Check
        </button>
        <button
          onClick={testCompletePaymentFlow}
          disabled={loading}
          className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 disabled:opacity-50"
        >
          Test Complete Flow
        </button>
        <button
          onClick={clearResults}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Clear Results
        </button>
      </div>

      {/* Loading Indicator */}
      {loading && (
        <div className="text-center py-4">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <p className="mt-2 text-gray-600">Testing payment APIs...</p>
        </div>
      )}

      {/* Results */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold mb-4">Test Results</h2>
        {results.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No test results yet. Click a test button to start testing.</p>
        ) : (
          results.map((result) => (
            <div key={result.id} className={`p-3 rounded-lg border ${getStatusColor(result.status)}`}>
              <div className="flex justify-between items-start">
                <div>
                  <span className="font-semibold">{result.test}</span>
                  <span className="ml-2 text-sm">({result.timestamp})</span>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  result.status === 'success' ? 'bg-green-200 text-green-800' :
                  result.status === 'error' ? 'bg-red-200 text-red-800' :
                  'bg-blue-200 text-blue-800'
                }`}>
                  {result.status.toUpperCase()}
                </span>
              </div>
              <p className="mt-1">{result.message}</p>
              {result.data && (
                <details className="mt-2">
                  <summary className="cursor-pointer text-sm font-medium">View Data</summary>
                  <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-auto">
                    {JSON.stringify(result.data, null, 2)}
                  </pre>
                </details>
              )}
            </div>
          ))
        )}
      </div>

      {/* API Information */}
      <div className="mt-8 bg-blue-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">ABA Payment API Information</h3>
        <div className="text-sm text-gray-700 space-y-1">
          <p><strong>Base URL:</strong> https://api.bakongcity.cityv1</p>
          <p><strong>QR Generation:</strong> GET /aba/generate-qr-image</p>
          <p><strong>Callback:</strong> POST /aba/callback</p>
          <p><strong>Secret Key:</strong> Configured and included in all requests</p>
          <p><strong>Callback Format:</strong> {`{tran_id: string, status: string, secret: string}`}</p>
          <p><strong>Direct Fetch Methods:</strong> Available for testing both QR generation and callback</p>
          <p><strong>Note:</strong> Fixed double slash issue in callback URL (was //aba/callback, now /aba/callback)</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentTester;
