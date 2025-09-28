import React, { useState } from 'react';
import { CheckCircle, Calendar, Users, ArrowLeft, Leaf, Printer, Download } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import QRCodeImage from '../assets/svg/QRCODE.jpg';

const BookingConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showReceipt, setShowReceipt] = useState(false);
  
  // Get booking data from location state or use default
  const bookingData = location.state?.bookingData || {
    checkIn: '2025-07-26',
    checkOut: '2025-07-28',
    guests: 2,
    rooms: 1,
    guestDetails: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phone: '+1234567890',
      location: 'New York'
    },
    addOns: {
      boatTransfer: true,
      biking: false,
      kayak: false,
      snorkeling: false
    },
    paymentMethod: 'qr'
  };

  // Get room data from location state or use default
  const roomData = location.state?.roomData || {
    id: '1',
    name: 'Luxury Ocean View Suite',
    price: 345
  };

  // Add-ons pricing
  const addOnsPricing = {
    boatTransfer: 25,
    biking: 15,
    kayak: 20,
    snorkeling: 18
  };

  const calculateAddOnsTotal = () => {
    let total = 0;
    Object.keys(bookingData.addOns).forEach(addon => {
      if (bookingData.addOns[addon] && addOnsPricing[addon]) {
        total += addOnsPricing[addon];
      }
    });
    return total;
  };

  const calculateRoomTotal = () => {
    if (!bookingData.checkIn || !bookingData.checkOut) return 0;
    
    const checkInDate = new Date(bookingData.checkIn);
    const checkOutDate = new Date(bookingData.checkOut);
    const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
    
    return nights * (roomData?.price || 0) * bookingData.rooms;
  };

  const calculateTotal = () => {
    const roomTotal = calculateRoomTotal();
    const addOnsTotal = calculateAddOnsTotal();
    return roomTotal + addOnsTotal;
  };

  const calculateNights = () => {
    if (!bookingData.checkIn || !bookingData.checkOut) return 0;
    
    const checkInDate = new Date(bookingData.checkIn);
    const checkOutDate = new Date(bookingData.checkOut);
    return Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const handlePrintReceipt = () => {
    setShowReceipt(true);
  };

  const handleCloseReceipt = () => {
    setShowReceipt(false);
  };

  const handleActualPrint = () => {
    // Create a print-friendly version
    const printWindow = window.open('', '_blank');
    const receiptContent = document.querySelector('.receipt-content');
    
    if (receiptContent) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Booking Receipt</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 20px;
              background: white;
            }
            .receipt {
              max-width: 600px;
              margin: 0 auto;
              background: white;
            }
            .header {
              text-align: center;
              margin-bottom: 20px;
            }
            .hotel-name {
              font-size: 24px;
              font-weight: bold;
              color: #0d9488;
              margin-bottom: 5px;
            }
            .hotel-subtitle {
              color: #6b7280;
              font-size: 14px;
              margin-bottom: 10px;
            }
            .receipt-number {
              font-size: 16px;
              font-weight: bold;
              color: #374151;
              margin-bottom: 20px;
            }
            .divider {
              width: 60px;
              height: 2px;
              background: #0d9488;
              margin: 0 auto 20px;
            }
            .section {
              background: #f9fafb;
              padding: 15px;
              border-radius: 8px;
              margin-bottom: 15px;
            }
            .section-title {
              font-size: 16px;
              font-weight: bold;
              color: #0d9488;
              margin-bottom: 10px;
            }
            .grid {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: 10px;
              font-size: 12px;
            }
            .grid-item {
              margin-bottom: 5px;
            }
            .label {
              color: #6b7280;
              font-size: 11px;
            }
            .value {
              font-weight: bold;
              color: #374151;
            }
            .payment-summary {
              background: #f0fdfa;
              border: 2px solid #0d9488;
              padding: 15px;
              border-radius: 8px;
            }
            .payment-title {
              font-size: 16px;
              font-weight: bold;
              color: #0d9488;
              margin-bottom: 10px;
            }
            .payment-item {
              display: flex;
              justify-content: space-between;
              font-size: 12px;
              margin-bottom: 5px;
            }
            .total {
              border-top: 1px solid #0d9488;
              padding-top: 10px;
              margin-top: 10px;
              font-size: 16px;
              font-weight: bold;
              color: #0d9488;
            }
            .payment-method {
              border-top: 1px solid #0d9488;
              padding-top: 10px;
              margin-top: 10px;
              font-size: 12px;
              display: flex;
              justify-content: space-between;
            }
            .status {
              color: #16a34a;
              font-weight: bold;
            }
            .footer {
              text-align: center;
              margin-top: 20px;
              padding-top: 15px;
              border-top: 1px solid #e5e7eb;
            }
            .footer-text {
              color: #6b7280;
              font-size: 12px;
              margin-bottom: 5px;
            }
            .contact {
              color: #9ca3af;
              font-size: 11px;
            }
          </style>
        </head>
        <body>
          <div class="receipt">
            <div class="header">
              <div class="hotel-name">THE OCEANSCAPE</div>
              <div class="hotel-subtitle">Hotel & Resort</div>
              <div class="divider"></div>
              <div class="receipt-number">Receipt #RC${Date.now().toString().slice(-8)}</div>
            </div>
            
            <div class="section">
              <div class="grid">
                <div class="grid-item">
                  <div class="label">Booking ID</div>
                  <div class="value">BK${Date.now().toString().slice(-6)}</div>
                </div>
                <div class="grid-item">
                  <div class="label">Guest</div>
                  <div class="value">${bookingData.guestDetails.firstName} ${bookingData.guestDetails.lastName}</div>
                </div>
                <div class="grid-item">
                  <div class="label">Room</div>
                  <div class="value">${roomData?.name || 'Luxury Ocean View Suite'}</div>
                </div>
                <div class="grid-item">
                  <div class="label">Check-in</div>
                  <div class="value">${formatDate(bookingData.checkIn)}</div>
                </div>
                <div class="grid-item">
                  <div class="label">Check-out</div>
                  <div class="value">${formatDate(bookingData.checkOut)}</div>
                </div>
                <div class="grid-item">
                  <div class="label">Guests</div>
                  <div class="value">${bookingData.guests} ${bookingData.guests === 1 ? 'Guest' : 'Guests'}</div>
                </div>
              </div>
            </div>
            
            <div class="payment-summary">
              <div class="payment-title">Payment Summary</div>
              <div class="payment-item">
                <span>Room (${calculateNights()} nights × ${bookingData.rooms} room${bookingData.rooms !== 1 ? 's' : ''})</span>
                <span>$${calculateRoomTotal()}</span>
              </div>
              ${calculateAddOnsTotal() > 0 ? `
              <div class="payment-item">
                <span>Add-ons</span>
                <span>$${calculateAddOnsTotal()}</span>
              </div>
              ` : ''}
              <div class="payment-item total">
                <span>Total</span>
                <span>$${calculateTotal()}</span>
              </div>
              <div class="payment-method">
                <span>Payment: ${bookingData.paymentMethod === 'qr' ? 'QR Code' : bookingData.paymentMethod === 'visa' ? 'Visa Card' : bookingData.paymentMethod}</span>
                <span class="status">✓ Paid</span>
              </div>
            </div>
            
            <div class="footer">
              <div class="footer-text">Thank you for choosing THE OCEANSCAPE Hotel & Resort</div>
              <div class="contact">Contact: +1 (555) 123-4567 | info@oceanscape.com</div>
            </div>
          </div>
        </body>
        </html>
      `);
      
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    }
  };

  return (
    <div className="min-h-screen bg-blue-50">
      {/* Print Styles */}
      <style jsx>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .receipt-content, .receipt-content * {
            visibility: visible;
          }
          .receipt-content {
            position: absolute;
            left: 0;
            top: 0;
            width: 100% !important;
            height: auto !important;
            max-height: none !important;
            overflow: visible !important;
            page-break-inside: avoid;
            font-size: 12px;
            line-height: 1.2;
            margin: 0;
            padding: 20px;
            box-shadow: none;
            border-radius: 0;
            background: white;
          }
          .receipt-content .space-y-3 > * + * {
            margin-top: 0.5rem;
          }
          .receipt-content .p-3 {
            padding: 0.5rem;
          }
          .receipt-content .p-6 {
            padding: 0.75rem;
          }
          .receipt-content .mb-6 {
            margin-bottom: 0.75rem;
          }
          .receipt-content .text-2xl {
            font-size: 1.25rem;
          }
          .receipt-content .text-lg {
            font-size: 1rem;
          }
          .receipt-content .text-base {
            font-size: 0.875rem;
          }
          .receipt-content .text-sm {
            font-size: 0.75rem;
          }
          .receipt-content .text-xs {
            font-size: 0.625rem;
          }
          .receipt-content .grid-cols-3 {
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 0.5rem;
          }
          .receipt-content .action-buttons {
            display: none;
          }
          .receipt-content .fixed {
            position: static !important;
          }
        }
      `}</style>
      
      <Header />
      
      {/* Breadcrumb */}
      <div className="pt-28 px-8">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
            <button 
              onClick={() => navigate('/')}
              className="hover:text-teal-600 transition-colors"
            >
              ROOM
            </button>
            <span>/</span>
            <button 
              onClick={() => navigate('/booking/1')}
              className="hover:text-teal-600 transition-colors"
            >
              DETAIL
            </button>
            <span>/</span>
            <span className="text-teal-600 font-medium">CONFIRMATION</span>
          </nav>
        </div>
      </div>

      <div className="px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-3xl p-8 shadow-lg">
            
            {/* Back Button */}
            <div className="mb-8">
              <button
                onClick={() => navigate('/booking/1')}
                className="flex items-center space-x-2 text-teal-600 hover:text-teal-700 transition-colors"
              >
                <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center">
                  <ArrowLeft className="w-4 h-4 text-white" />
                </div>
                <span className="font-medium">Back</span>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              
              {/* Left Side - Booking Details */}
              <div className="space-y-8">
                <h2 className="text-2xl font-bold text-teal-600 mb-6">Your Booking</h2>
                
                {/* Booking Details */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                    <Calendar className="w-5 h-5 text-teal-600" />
                    <div>
                      <div className="text-sm text-gray-500">Check-in</div>
                      <div className="font-semibold text-gray-800">
                        {formatDate(bookingData.checkIn)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                    <Calendar className="w-5 h-5 text-teal-600" />
                    <div>
                      <div className="text-sm text-gray-500">Checkout</div>
                      <div className="font-semibold text-gray-800">
                        {formatDate(bookingData.checkOut)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                    <Users className="w-5 h-5 text-teal-600" />
                    <div>
                      <div className="text-sm text-gray-500">Guest</div>
                      <div className="font-semibold text-gray-800">
                        {bookingData.guests} {bookingData.guests === 1 ? 'Adult' : 'Adults'}, {bookingData.rooms} {bookingData.rooms === 1 ? 'Room' : 'Rooms'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Add-ons Section */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-teal-600 mb-4">Add-ons</h3>
                  <div className="space-y-3">
                    {[
                      { key: 'boatTransfer', label: 'Boat transfer', checked: bookingData.addOns.boatTransfer },
                      { key: 'biking', label: 'Biking', checked: bookingData.addOns.biking },
                      { key: 'kayak', label: 'Kayak', checked: bookingData.addOns.kayak },
                      { key: 'snorkeling', label: 'Snorkeling equipment', checked: bookingData.addOns.snorkeling }
                    ].map((addon) => (
                      <div key={addon.key} className="flex items-center space-x-3">
                        <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                          addon.checked ? 'bg-teal-600 border-teal-600' : 'border-gray-300'
                        }`}>
                          {addon.checked && <div className="w-2 h-2 bg-white rounded-full"></div>}
                        </div>
                        <span className={`text-gray-700 ${addon.checked ? 'font-medium' : ''}`}>
                          {addon.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Side - Confirmation */}
              <div className="flex flex-col items-center justify-center space-y-6">
                <div className="w-20 h-20 bg-teal-600 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
                
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-teal-600 mb-2">Your booking is now confirms</h3>
                  <p className="text-gray-600">
                    Thank you for choosing THE OCEANSCAPE Hotel & Resort. 
                    You will receive a confirmation email shortly.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 w-full">
                  <h4 className="font-semibold text-gray-800 mb-4">Booking Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Booking ID:</span>
                      <span className="font-semibold">BK{Date.now().toString().slice(-6)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Room:</span>
                      <span className="font-semibold">{roomData?.name || 'Room'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Nights:</span>
                      <span className="font-semibold">{calculateNights()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Guests:</span>
                      <span className="font-semibold">{bookingData.guests}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Rooms:</span>
                      <span className="font-semibold">{bookingData.rooms}</span>
                    </div>
                    
                    {/* Price breakdown */}
                    <div className="border-t pt-2 mt-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Room Total:</span>
                        <span className="font-semibold">${calculateRoomTotal()}</span>
                      </div>
                      {calculateAddOnsTotal() > 0 && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Add-ons:</span>
                          <span className="font-semibold">${calculateAddOnsTotal()}</span>
                        </div>
                      )}
                      <div className="flex justify-between font-bold text-lg border-t pt-1 mt-1 text-teal-600">
                        <span>Total:</span>
                        <span>${calculateTotal()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* QR Code Display for QR Payment */}
                {bookingData.paymentMethod === 'qr' && (
                  <div className="bg-white rounded-xl p-6 w-full border-2 border-gray-200">
                    <h4 className="font-semibold text-gray-800 mb-4 text-center">Payment QR Code</h4>
                    <div className="text-center">
                      <div className="bg-white p-8 rounded-xl border-4 border-gray-300 inline-block shadow-lg">
                        <img 
                          src={QRCodeImage} 
                          alt="QR Code for Payment" 
                          className="w-80 h-80 mx-auto object-contain"
                          style={{ imageRendering: 'crisp-edges' }}
                        />
                      </div>
                      <p className="text-gray-600 mt-3 text-lg">
                        Scan this QR code to complete your payment
                      </p>
                      <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                        <p className="text-lg font-bold text-blue-800">
                          Payment Amount: ${calculateTotal()}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex space-x-4 w-full">
                  <button
                    onClick={() => navigate('/')}
                    className="flex-1 bg-teal-600 text-white py-3 px-6 rounded-xl hover:bg-teal-700 transition-colors font-semibold"
                  >
                    Back to Home
                  </button>
                  <button
                    onClick={handlePrintReceipt}
                    className="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-xl hover:bg-gray-50 transition-colors font-semibold"
                  >
                    Print Confirmation
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {/* Beautiful Booking Receipt Modal */}
      {showReceipt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-2xl w-full mx-4 shadow-2xl max-h-[90vh] overflow-y-auto receipt-content">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-teal-600 mb-1">THE OCEANSCAPE</h2>
              <p className="text-gray-600 text-sm">Hotel & Resort</p>
              <div className="w-12 h-0.5 bg-teal-600 mx-auto mt-1"></div>
              <p className="text-base font-semibold text-gray-700 mt-2">Receipt #RC{Date.now().toString().slice(-8)}</p>
            </div>

            {/* Receipt Content */}
            <div className="space-y-3">
              {/* Compact Booking Info */}
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="grid grid-cols-3 gap-3 text-xs">
                  <div>
                    <p className="text-gray-600">Booking ID</p>
                    <p className="font-semibold">BK{Date.now().toString().slice(-6)}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Guest</p>
                    <p className="font-semibold">{bookingData.guestDetails.firstName} {bookingData.guestDetails.lastName}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Room</p>
                    <p className="font-semibold">{roomData?.name || 'Luxury Ocean View Suite'}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Check-in</p>
                    <p className="font-semibold">{formatDate(bookingData.checkIn)}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Check-out</p>
                    <p className="font-semibold">{formatDate(bookingData.checkOut)}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Guests</p>
                    <p className="font-semibold">{bookingData.guests} {bookingData.guests === 1 ? 'Guest' : 'Guests'}</p>
                  </div>
                </div>
              </div>

              {/* Compact Payment Summary */}
              <div className="bg-teal-50 p-3 rounded-lg border border-teal-200">
                <h3 className="text-base font-semibold text-teal-800 mb-2">Payment Summary</h3>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span>Room ({calculateNights()} nights × {bookingData.rooms} room{bookingData.rooms !== 1 ? 's' : ''})</span>
                    <span className="font-semibold">${calculateRoomTotal()}</span>
                  </div>
                  {calculateAddOnsTotal() > 0 && (
                    <div className="flex justify-between">
                      <span>Add-ons</span>
                      <span className="font-semibold">${calculateAddOnsTotal()}</span>
                    </div>
                  )}
                  <div className="border-t border-teal-300 pt-1">
                    <div className="flex justify-between text-base font-bold text-teal-800">
                      <span>Total</span>
                      <span>${calculateTotal()}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-2 pt-2 border-t border-teal-300">
                  <div className="flex justify-between text-xs">
                    <span>Payment: {bookingData.paymentMethod === 'qr' ? 'QR Code' : bookingData.paymentMethod === 'visa' ? 'Visa Card' : bookingData.paymentMethod}</span>
                    <span className="text-green-600 font-semibold">✓ Paid</span>
                  </div>
                </div>
              </div>

              {/* Compact Footer */}
              <div className="text-center pt-2 border-t border-gray-200">
                <p className="text-gray-600 text-xs">Thank you for choosing THE OCEANSCAPE Hotel & Resort</p>
                <p className="text-xs text-gray-500 mt-1">
                  Contact: +1 (555) 123-4567 | info@oceanscape.com
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 mt-6 pt-4 border-t border-gray-200 action-buttons">
              <button
                onClick={handleCloseReceipt}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-semibold"
              >
                Close
              </button>
              <button
                onClick={handleActualPrint}
                className="flex-1 px-6 py-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors font-semibold flex items-center justify-center"
              >
                <Printer className="w-4 h-4 mr-2" />
                Print Receipt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingConfirmation;

