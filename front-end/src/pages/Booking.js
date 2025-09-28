import React, { useState, useEffect, useRef } from 'react';
import { 
  Calendar, 
  User, 
  CreditCard, 
  MapPin, 
  CheckCircle,
  Users,
  Bed,
  Phone,
  Mail,
  ArrowLeft
} from 'lucide-react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PaymentInfo from '../components/PaymentInfo';
import QRCodeImage from '../assets/svg/QRCODE.jpg';

const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get room/activity data from location state or use default
  const bookingItem = location.state?.room || location.state?.activity || {
    id: id || '1',
    name: 'Luxury Ocean View Suite',
    hotelName: 'Paradise Resort',
    price: 345,
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    type: 'Deluxe',
    amenities: ['Air Conditioning', 'Coffee Machine', 'Smart TV', 'Free WiFi']
  };

  // Determine if this is an activity booking
  const isActivityBooking = location.state?.activity || id === 'activity';

  const [currentStep, setCurrentStep] = useState(1);
  const [showQRPopup, setShowQRPopup] = useState(false);
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const countdownRef = useRef(null);
  const [bookingData, setBookingData] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1,
    rooms: 1,
    guestDetails: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      location: '',
      specialRequests: ''
    },
    paymentMethod: 'qr',
    addOns: {
      boatTransfer: false,
      biking: false,
      kayak: false,
      snorkeling: false
    },
    cardDetails: {
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      cardholderName: ''
    }
  });


  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setBookingData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setBookingData(prev => ({
        ...prev,
        [field]: value
      }));
    }
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
    
    return nights * (bookingItem?.price || 0) * bookingData.rooms;
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

  // Countdown timer effect
  useEffect(() => {
    if (showQRPopup && countdown > 0) {
      countdownRef.current = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else if (showQRPopup && countdown === 0) {
      // Auto complete payment after countdown reaches 0
      handleQRPaymentComplete();
    }

    return () => {
      if (countdownRef.current) {
        clearTimeout(countdownRef.current);
      }
    };
  }, [showQRPopup, countdown]);

  // Reset countdown when QR popup opens
  useEffect(() => {
    if (showQRPopup) {
      setCountdown(30);
    }
  }, [showQRPopup]);


  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      // If on step 1, go back to appropriate page
      if (isActivityBooking) {
        navigate('/activities');
      } else {
        navigate(`/room/${bookingItem.id}`);
      }
    }
  };

  const handleSubmit = () => {
    if (bookingData.paymentMethod === 'qr') {
      // Show QR popup for QR payment
      setShowQRPopup(true);
    } else if (bookingData.paymentMethod === 'visa') {
      // Show Visa payment popup
      setShowPaymentPopup(true);
    } else {
      // Navigate directly to confirmation for other payment methods
      console.log('Booking submitted:', bookingData);
      navigate('/booking-confirmation', { state: { bookingData, bookingItem, isActivityBooking } });
    }
  };

  const handleQRPaymentComplete = () => {
    // Clear timer and close QR popup
    if (countdownRef.current) {
      clearTimeout(countdownRef.current);
    }
    setShowQRPopup(false);
    console.log('QR Payment completed:', bookingData);
    navigate('/booking-confirmation', { state: { bookingData, bookingItem, isActivityBooking } });
  };

  const handleCancelQR = () => {
    // Clear timer and close QR popup
    if (countdownRef.current) {
      clearTimeout(countdownRef.current);
    }
    setShowQRPopup(false);
  };

  const handlePaymentPopupBack = () => {
    setShowPaymentPopup(false);
  };

  const handlePaymentConfirm = (updatedBookingData) => {
    setShowPaymentPopup(false);
    console.log('Visa Payment completed:', updatedBookingData);
    navigate('/booking-confirmation', { state: { bookingData: updatedBookingData, bookingItem, isActivityBooking } });
  };


  return (
    <div className="min-h-screen bg-blue-50">
      <Header />
      
      {/* Breadcrumb */}
      <div className="pt-28 px-8">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
            <button 
              onClick={() => navigate(isActivityBooking ? '/activities' : '/')}
              className="hover:text-teal-600 transition-colors"
            >
              {isActivityBooking ? 'ACTIVITIES' : 'ROOM'}
            </button>
            <span>/</span>
            {!isActivityBooking && (
              <>
                <button 
                  onClick={() => navigate(`/room/${id}`)}
                  className="hover:text-teal-600 transition-colors"
                >
                  DETAIL
                </button>
                <span>/</span>
              </>
            )}
            <span className="text-teal-600 font-medium">PAYMENT</span>
          </nav>
        </div>
      </div>

      <div className="px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-3xl p-8 shadow-lg">
            
            {/* Back Button */}
            <div className="mb-8">
              <button
                onClick={prevStep}
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
                    <div className="flex-1">
                      <div className="text-sm text-gray-500">Check-in</div>
                      <input
                        type="date"
                        value={bookingData.checkIn}
                        onChange={(e) => handleInputChange('checkIn', e.target.value)}
                        className="w-full bg-transparent border-none p-0 font-semibold text-gray-800 focus:outline-none"
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                    <Calendar className="w-5 h-5 text-teal-600" />
                    <div className="flex-1">
                      <div className="text-sm text-gray-500">Checkout</div>
                      <input
                        type="date"
                        value={bookingData.checkOut}
                        onChange={(e) => handleInputChange('checkOut', e.target.value)}
                        className="w-full bg-transparent border-none p-0 font-semibold text-gray-800 focus:outline-none"
                        min={bookingData.checkIn || new Date().toISOString().split('T')[0]}
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                    <Users className="w-5 h-5 text-teal-600" />
                    <div className="flex-1">
                      <div className="text-sm text-gray-500">Guest</div>
                      <div className="flex items-center space-x-4">
                        <select
                          value={bookingData.guests}
                          onChange={(e) => handleInputChange('guests', parseInt(e.target.value))}
                          className="bg-transparent border-none font-semibold text-gray-800 focus:outline-none"
                        >
                          {[1,2,3,4,5,6].map(num => (
                            <option key={num} value={num}>{num} {num === 1 ? 'Adult' : 'Adults'}</option>
                          ))}
                        </select>
                        <span className="text-gray-400">,</span>
                        <select
                          value={bookingData.rooms}
                          onChange={(e) => handleInputChange('rooms', parseInt(e.target.value))}
                          className="bg-transparent border-none font-semibold text-gray-800 focus:outline-none"
                        >
                          {[1,2,3,4].map(num => (
                            <option key={num} value={num}>{num} {num === 1 ? 'Room' : 'Rooms'}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Add-ons Section */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-teal-600 mb-4">Add-ons</h3>
                  <div className="space-y-3">
                    {[
                      { key: 'boatTransfer', label: 'Boat transfer', price: addOnsPricing.boatTransfer, checked: bookingData.addOns.boatTransfer },
                      { key: 'biking', label: 'Biking', price: addOnsPricing.biking, checked: bookingData.addOns.biking },
                      { key: 'kayak', label: 'Kayak', price: addOnsPricing.kayak, checked: bookingData.addOns.kayak },
                      { key: 'snorkeling', label: 'Snorkeling equipment', price: addOnsPricing.snorkeling, checked: bookingData.addOns.snorkeling }
                    ].map((addon) => (
                      <label key={addon.key} className="flex items-center justify-between cursor-pointer p-3 border border-gray-200 rounded-lg hover:border-teal-300 transition-colors">
                        <div className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            checked={addon.checked}
                            onChange={(e) => handleInputChange(`addOns.${addon.key}`, e.target.checked)}
                            className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                          />
                          <span className="text-gray-700">{addon.label}</span>
                        </div>
                        <span className="text-teal-600 font-semibold">${addon.price}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Total Price Display */}
                <div className="border-t pt-6">
                  <div className="bg-teal-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-teal-800">Total Price</span>
                      <span className="text-2xl font-bold text-teal-600">${calculateTotal()}</span>
                    </div>
                    <div className="text-sm text-teal-600 mt-1">
                      {calculateNights()} night{calculateNights() !== 1 ? 's' : ''} × {bookingData.rooms} room{bookingData.rooms !== 1 ? 's' : ''}
                      {calculateAddOnsTotal() > 0 && (
                        <span> + ${calculateAddOnsTotal()} add-ons</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Guest Info & Payment */}
              <div className="space-y-8">
                {/* Guest Information */}
                <div>
                  <h3 className="text-lg font-semibold text-teal-600 mb-4">Guest Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          value={`${bookingData.guestDetails.firstName} ${bookingData.guestDetails.lastName}`.trim()}
                          onChange={(e) => {
                            const names = e.target.value.split(' ');
                            handleInputChange('guestDetails.firstName', names[0] || '');
                            handleInputChange('guestDetails.lastName', names.slice(1).join(' ') || '');
                          }}
                          className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                          placeholder="Your name"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="tel"
                          value={bookingData.guestDetails.phone}
                          onChange={(e) => handleInputChange('guestDetails.phone', e.target.value)}
                          className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                          placeholder="Phone number"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="email"
                          value={bookingData.guestDetails.email}
                          onChange={(e) => handleInputChange('guestDetails.email', e.target.value)}
                          className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                          placeholder="Your Email"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          value={bookingData.guestDetails.location}
                          onChange={(e) => handleInputChange('guestDetails.location', e.target.value)}
                          className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                          placeholder="Location"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div>
                  <h3 className="text-lg font-semibold text-teal-600 mb-4">Payment Method</h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Choose your payment</label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={() => handleInputChange('paymentMethod', 'qr')}
                        className={`p-4 border rounded-xl text-center transition-colors ${
                          bookingData.paymentMethod === 'qr'
                            ? 'border-teal-500 bg-teal-50 text-teal-700'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        QR
                      </button>
                      <button
                        onClick={() => handleInputChange('paymentMethod', 'visa')}
                        className={`p-4 border rounded-xl text-center transition-colors ${
                          bookingData.paymentMethod === 'visa'
                            ? 'border-teal-500 bg-teal-50 text-teal-700'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        Visa
                      </button>
                    </div>
                    
                  </div>
                </div>

                {/* Confirm Button */}
                <button
                  onClick={handleSubmit}
                  className="w-full bg-teal-600 text-white py-4 px-6 rounded-xl hover:bg-teal-700 transition-colors font-semibold text-lg"
                >
                  Confirms
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {/* QR Payment Popup Modal */}
      {showQRPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-0 max-w-md w-full mx-4 shadow-2xl relative overflow-hidden">
            {/* Header with Gradient */}
            <div className="bg-gradient-to-r from-teal-600 to-teal-700 px-6 py-5 text-white relative">
              <h3 className="text-xl font-bold text-center">Complete Payment</h3>
              {/* Countdown Timer - Top Right */}
              <div className="absolute top-2 right-4">
                <div className="relative">
                  {/* Outer ring with animation */}
                  <div className="w-12 h-12 rounded-full border-3 border-red-400 border-opacity-60 flex items-center justify-center">
                    {/* Inner circle with gradient */}
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-red-600 backdrop-blur-sm flex items-center justify-center shadow-lg">
                      <span className="text-sm font-bold text-white drop-shadow-md">{countdown}</span>
                    </div>
                  </div>
                  {/* Animated pulse ring */}
                  <div className="absolute inset-0 w-12 h-12 rounded-full border-2 border-red-400 border-opacity-70 animate-ping"></div>
                </div>
              </div>
            </div>
            
            <div className="p-8 text-center">
              {/* Payment Provider */}
              <div className="mb-6">
                <div className="inline-flex items-center space-x-3 bg-blue-50 px-4 py-2 rounded-full">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">AB</span>
                  </div>
                  <span className="text-blue-800 font-semibold">ABA'PAY</span>
                </div>
                <p className="text-sm text-gray-500 mt-2">Scan. Pay. Done.</p>
              </div>
              
              {/* QR Code Container */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-2xl mb-6 border border-gray-200">
                <div className="bg-white p-4 rounded-xl shadow-inner">
                  <img 
                    src={QRCodeImage} 
                    alt="QR Code for Payment" 
                    className="w-64 h-64 mx-auto object-contain"
                    style={{ imageRendering: 'crisp-edges' }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">POV PISAL</p>
              </div>
              
              {/* Instructions */}
              <p className="text-gray-600 mb-6 text-base leading-relaxed">
                Scan this QR code with your mobile payment app to complete the payment
              </p>
              
              {/* Payment Amount */}
              <div className="mb-8 p-4 bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl border border-teal-200">
                <p className="text-sm text-gray-600 mb-1">Payment Amount</p>
                <p className="text-2xl font-bold text-teal-700">
                  ${calculateTotal()}
                </p>
              </div>
              
              {/* Action Buttons */}
              <div className="flex space-x-3">
                <button
                  onClick={handleCancelQR}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={handleQRPaymentComplete}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-xl hover:from-teal-700 hover:to-teal-800 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl"
                >
                  Payment Complete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Visa Payment Popup Modal */}
      {showPaymentPopup && (
        <PaymentInfo
          bookingData={bookingData}
          bookingItem={bookingItem}
          isActivityBooking={isActivityBooking}
          onBack={handlePaymentPopupBack}
          onConfirmPayment={handlePaymentConfirm}
          totalAmount={calculateTotal()}
        />
      )}
    </div>
  );
};

export default Booking;
