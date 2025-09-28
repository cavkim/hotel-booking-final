import React, { useState } from 'react';

const CallbackExample = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Your exact callback function
  const simulateCallback = async (transactionId, status) => {
    try {
      await fetch('https://api.bakongcity.cityaba/callback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tran_id: transactionId,
          status: status,
          secret: 'MzQ1MzZmNDU0NjRmNjQ2ZDRlMzU0NzQ1NTUzNzcxNDU1NTQyNTQ0YzQxNTE0NDQ0NTM0NDU0NDU0MjQ1NDU1Mw=='
        })
      });
      
      setResult({
        success: true,
        message: `Callback sent successfully for transaction ${transactionId} with status ${status}`,
        transactionId,
        status
      });
    } catch (error) {
      console.error('Callback simulation error:', error);
      setResult({
        success: false,
        message: `Error: ${error.message}`,
        transactionId,
        status
      });
    }
  };

  const handleTestCallback = async () => {
    setLoading(true);
    setResult(null);
    
    const transactionId = 'txn-' + Date.now();
    const status = 'success';
    
    await simulateCallback(transactionId, status);
    setLoading(false);
  };

  const handleTestFailedCallback = async () => {
    setLoading(true);
    setResult(null);
    
    const transactionId = 'txn-' + Date.now();
    const status = 'failed';
    
    await simulateCallback(transactionId, status);
    setLoading(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">ABA Callback Example</h1>
      
      <div className="bg-gray-100 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">Your Callback Function</h2>
        <pre className="bg-gray-800 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`async function simulateCallback(transactionId, status) {
    try {
        await fetch('https://api.bakongcity.cityaba/callback', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                tran_id: transactionId,
                status: status,
                secret: 'MzQ1MzZmNDU0NjRmNjQ2ZDRlMzU0NzQ1NTUzNzcxNDU1NTQyNTQ0YzQxNTE0NDQ0NTM0NDU0NDU0MjQ1NDU1Mw=='
            })
        });
    } catch (error) {
        console.error('Callback simulation error:', error);
    }
}`}
        </pre>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <button
          onClick={handleTestCallback}
          disabled={loading}
          className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 disabled:opacity-50 font-semibold"
        >
          {loading ? 'Sending...' : 'Test Success Callback'}
        </button>
        
        <button
          onClick={handleTestFailedCallback}
          disabled={loading}
          className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 disabled:opacity-50 font-semibold"
        >
          {loading ? 'Sending...' : 'Test Failed Callback'}
        </button>
      </div>

      {result && (
        <div className={`p-4 rounded-lg ${
          result.success 
            ? 'bg-green-100 border border-green-400 text-green-700' 
            : 'bg-red-100 border border-red-400 text-red-700'
        }`}>
          <h3 className="font-semibold mb-2">
            {result.success ? '✅ Success' : '❌ Error'}
          </h3>
          <p className="mb-2">{result.message}</p>
          <div className="text-sm">
            <p><strong>Transaction ID:</strong> {result.transactionId}</p>
            <p><strong>Status:</strong> {result.status}</p>
          </div>
        </div>
      )}

      <div className="mt-8 bg-blue-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">API Details</h3>
        <div className="text-sm text-gray-700 space-y-1">
          <p><strong>Endpoint:</strong> POST https://api.bakongcity.cityaba/callback</p>
          <p><strong>Headers:</strong> Content-Type: application/json</p>
          <p><strong>Body:</strong> {`{tran_id: string, status: string, secret: string}`}</p>
          <p><strong>Secret Key:</strong> MzQ1MzZmNDU0NjRmNjQ2ZDRlMzU0NzQ1NTUzNzcxNDU1NTQyNTQ0YzQxNTE0NDQ0NTM0NDU0NDU0MjQ1NDU1Mw==</p>
        </div>
      </div>
    </div>
  );
};

export default CallbackExample;
