import React, { useState, useEffect } from 'react';

const MockServiceNotification = () => {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Listen for mock service usage
    const originalConsoleWarn = console.warn;
    console.warn = (...args) => {
      if (args[0] && args[0].includes('falling back to mock service')) {
        setMessage('Using Mock Service - Backend API not available');
        setShow(true);
        setTimeout(() => setShow(false), 5000);
      }
      originalConsoleWarn.apply(console, args);
    };

    return () => {
      console.warn = originalConsoleWarn;
    };
  }, []);

  if (!show) return null;

  return (
    <div className="fixed top-20 right-4 z-50 max-w-sm">
      <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded-lg shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-semibold">🔄 Development Mode</div>
            <div className="text-sm">{message}</div>
          </div>
          <button
            onClick={() => setShow(false)}
            className="ml-2 text-yellow-600 hover:text-yellow-800"
          >
            ✕
          </button>
        </div>
        <div className="mt-2 text-xs">
          <p>• Registration and login will work with mock data</p>
          <p>• Start your backend API to use real data</p>
          <p>• Check BACKEND_SETUP_GUIDE.md for instructions</p>
        </div>
      </div>
    </div>
  );
};

export default MockServiceNotification;
