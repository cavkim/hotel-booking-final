import React from 'react';
import { CheckCircle, Calendar, User, CreditCard, MapPin, Clock } from 'lucide-react';

const BookingConfirmation = ({ bookingData, roomData, bookingId }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateTotal = () => {
    if (!bookingData.checkIn || !bookingData.checkOut) return 0;
    
    const checkInDate = new Date(bookingData.checkIn);
    const checkOutDate = new Date(bookingData.checkOut);
    const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
    
    return nights * roomData.price * bookingData.rooms;
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 shadow-lg">
      {/* Success Header */}
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Booking Confirmed!</h1>
        <p className="text-gray-600">
          Your reservation has been successfully created. You will receive a confirmation email shortly.
        </p>
      </div>

      {/* Booking Details Card */}
      <div className="bg-gray-50 rounded-2xl p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Booking Details</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                <Calendar className="w-5 h-5 text-teal-600" />
              </div>
              <div>
                <div className="text-sm text-gray-500">Booking ID</div>
                <div className="font-semibold text-gray-800">#{bookingId}</div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="text-sm text-gray-500">Check-in</div>
                <div className="font-semibold text-gray-800">{formatDate(bookingData.checkIn)}</div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="text-sm text-gray-500">Check-out</div>
                <div className="font-semibold text-gray-800">{formatDate(bookingData.checkOut)}</div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <div className="text-sm text-gray-500">Guests</div>
                <div className="font-semibold text-gray-800">{bookingData.guests} {bookingData.guests === 1 ? 'Guest' : 'Guests'}</div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <MapPin className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <div className="text-sm text-gray-500">Rooms</div>
                <div className="font-semibold text-gray-800">{bookingData.rooms} {bookingData.rooms === 1 ? 'Room' : 'Rooms'}</div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <div className="text-sm text-gray-500">Total Amount</div>
                <div className="font-semibold text-gray-800">${calculateTotal()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Room Information */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Room Information</h2>
        
        <div className="flex items-start space-x-4">
          <img
            src={roomData.image}
            alt={roomData.name}
            className="w-24 h-24 object-cover rounded-lg"
          />
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-800 mb-1">{roomData.name}</h3>
            <p className="text-gray-600 mb-2">{roomData.hotelName}</p>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span>Type: {roomData.type}</span>
              <span>Price: ${roomData.price}/night</span>
            </div>
          </div>
        </div>
      </div>

      {/* Guest Information */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Guest Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-gray-500">Full Name</div>
            <div className="font-semibold text-gray-800">
              {bookingData.guestDetails.firstName} {bookingData.guestDetails.lastName}
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Email</div>
            <div className="font-semibold text-gray-800">{bookingData.guestDetails.email}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Phone</div>
            <div className="font-semibold text-gray-800">{bookingData.guestDetails.phone}</div>
          </div>
          {bookingData.guestDetails.specialRequests && (
            <div className="md:col-span-2">
              <div className="text-sm text-gray-500">Special Requests</div>
              <div className="font-semibold text-gray-800">{bookingData.guestDetails.specialRequests}</div>
            </div>
          )}
        </div>
      </div>

      {/* Important Information */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8">
        <h2 className="text-xl font-semibold text-blue-800 mb-4 flex items-center">
          <Clock className="w-5 h-5 mr-2" />
          Important Information
        </h2>
        
        <div className="space-y-3 text-sm text-blue-700">
          <div className="flex items-start space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
            <div>Check-in time: 3:00 PM | Check-out time: 11:00 AM</div>
          </div>
          <div className="flex items-start space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
            <div>Free cancellation up to 24 hours before check-in</div>
          </div>
          <div className="flex items-start space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
            <div>Please bring a valid ID for check-in</div>
          </div>
          <div className="flex items-start space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
            <div>Contact hotel directly for any special arrangements</div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={() => window.print()}
          className="px-8 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-semibold"
        >
          Print Confirmation
        </button>
        <button
          onClick={() => window.location.href = 'mailto:' + bookingData.guestDetails.email}
          className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
        >
          Email Confirmation
        </button>
        <button
          onClick={() => window.location.href = '/'}
          className="px-8 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-semibold"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default BookingConfirmation;
