import React, { useState } from 'react';
import { paymentService } from '../services';

const BookingPaymentExample = () => {
  const [booking, setBooking] = useState({
    hotelName: 'Grand Hotel',
    roomType: 'Deluxe Room',
    checkIn: '2024-01-15',
    checkOut: '2024-01-17',
    guests: 2,
    totalAmount: 300,
    currency: 'USD'
  });

  const [qrData, setQrData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: Booking Details, 2: Payment QR, 3: Payment Complete

  const generatePaymentQR = async () => {
    setLoading(true);
    try {
      const bookingData = {
        totalAmount: booking.totalAmount,
        currency: booking.currency,
        hotelName: booking.hotelName,
        bookingId: 'booking-' + Date.now(),
        customerName: 'John Doe',
        checkIn: booking.checkIn,
        checkOut: booking.checkOut
      };

      const qrResult = await paymentService.generateQRForBooking(bookingData);
      setQrData(qrResult);
      setStep(2);
    } catch (error) {
      alert('Failed to generate QR code: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const simulatePayment = async () => {
    if (qrData?.transaction_id) {
      try {
        await paymentService.simulateCallbackDirect(qrData.transaction_id, 'success');
        setStep(3);
      } catch (error) {
        alert('Payment simulation failed: ' + error.message);
      }
    }
  };

  const resetBooking = () => {
    setQrData(null);
    setStep(1);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Hotel Booking Payment Flow</h1>
      
      {/* Progress Steps */}
      <div className="flex justify-center mb-8">
        <div className="flex items-center space-x-4">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            step >= 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600'
          }`}>
            1
          </div>
          <div className={`w-16 h-1 ${step >= 2 ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            step >= 2 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600'
          }`}>
            2
          </div>
          <div className={`w-16 h-1 ${step >= 3 ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            step >= 3 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600'
          }`}>
            3
          </div>
        </div>
      </div>

      {/* Step 1: Booking Details */}
      {step === 1 && (
        <div className="max-w-2xl mx-auto">
          <div className="bg-white border rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-semibold mb-6">Booking Details</h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Hotel Name</label>
                  <input
                    type="text"
                    value={booking.hotelName}
                    onChange={(e) => setBooking(prev => ({ ...prev, hotelName: e.target.value }))}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Room Type</label>
                  <input
                    type="text"
                    value={booking.roomType}
                    onChange={(e) => setBooking(prev => ({ ...prev, roomType: e.target.value }))}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Check In</label>
                  <input
                    type="date"
                    value={booking.checkIn}
                    onChange={(e) => setBooking(prev => ({ ...prev, checkIn: e.target.value }))}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Check Out</label>
                  <input
                    type="date"
                    value={booking.checkOut}
                    onChange={(e) => setBooking(prev => ({ ...prev, checkOut: e.target.value }))}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Guests</label>
                  <input
                    type="number"
                    value={booking.guests}
                    onChange={(e) => setBooking(prev => ({ ...prev, guests: parseInt(e.target.value) }))}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Total Amount</label>
                  <input
                    type="number"
                    value={booking.totalAmount}
                    onChange={(e) => setBooking(prev => ({ ...prev, totalAmount: parseFloat(e.target.value) }))}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button
                onClick={generatePaymentQR}
                disabled={loading}
                className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
              >
                {loading ? 'Generating QR...' : 'Proceed to Payment'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Payment QR */}
      {step === 2 && qrData && (
        <div className="max-w-2xl mx-auto">
          <div className="bg-white border rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-semibold mb-6">Payment QR Code</h2>
            
            <div className="text-center mb-6">
              <h3 className="text-lg font-medium mb-2">{booking.hotelName}</h3>
              <p className="text-gray-600">{booking.roomType}</p>
              <p className="text-gray-600">{booking.checkIn} to {booking.checkOut}</p>
              <p className="text-2xl font-bold text-blue-600 mt-2">
                {booking.currency} {booking.totalAmount}
              </p>
            </div>
            
            <div className="text-center mb-6">
              {qrData.qr_code && (
                <img
                  src={qrData.qr_code}
                  alt="Payment QR Code"
                  className="mx-auto border rounded-lg shadow-md"
                  style={{ maxWidth: '250px', maxHeight: '250px' }}
                />
              )}
            </div>
            
            <div className="text-center text-sm text-gray-600 mb-6">
              <p>Scan this QR code with your ABA mobile app to complete payment</p>
              <p className="mt-1">Transaction ID: {qrData.transaction_id}</p>
            </div>
            
            <div className="flex justify-center space-x-4">
              <button
                onClick={simulatePayment}
                className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
              >
                Simulate Payment Success
              </button>
              <button
                onClick={resetBooking}
                className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
              >
                Start Over
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Payment Complete */}
      {step === 3 && (
        <div className="max-w-2xl mx-auto">
          <div className="bg-white border rounded-lg p-6 shadow-lg text-center">
            <div className="text-green-500 text-6xl mb-4">✓</div>
            <h2 className="text-2xl font-semibold mb-4 text-green-600">Payment Successful!</h2>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <h3 className="font-semibold mb-2">Booking Confirmed</h3>
              <p><strong>Hotel:</strong> {booking.hotelName}</p>
              <p><strong>Room:</strong> {booking.roomType}</p>
              <p><strong>Dates:</strong> {booking.checkIn} to {booking.checkOut}</p>
              <p><strong>Guests:</strong> {booking.guests}</p>
              <p><strong>Amount Paid:</strong> {booking.currency} {booking.totalAmount}</p>
            </div>
            
            <div className="space-x-4">
              <button
                onClick={resetBooking}
                className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
              >
                Book Another Room
              </button>
              <button
                onClick={() => window.print()}
                className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
              >
                Print Confirmation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* API Information */}
      <div className="mt-8 bg-blue-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Integration Example</h3>
        <div className="text-sm text-gray-700 space-y-1">
          <p><strong>QR Generation:</strong> paymentService.generateQRForBooking(bookingData)</p>
          <p><strong>Payment Simulation:</strong> paymentService.simulateCallbackDirect(transactionId, 'success')</p>
          <p><strong>Complete Flow:</strong> Booking → QR Generation → Payment → Confirmation</p>
        </div>
      </div>
    </div>
  );
};

export default BookingPaymentExample;
