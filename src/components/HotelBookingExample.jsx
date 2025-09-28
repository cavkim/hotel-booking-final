import React, { useState, useEffect } from 'react';
import { hotelService, roomService, bookingService, reviewService } from '../services';

// Example component demonstrating API service usage
const HotelBookingExample = () => {
  const [hotels, setHotels] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedHotel, setSelectedHotel] = useState(null);

  // Load hotels on component mount
  useEffect(() => {
    loadHotels();
  }, []);

  // Load hotels
  const loadHotels = async () => {
    try {
      setLoading(true);
      setError(null);
      const hotelsData = await hotelService.getAllHotels();
      setHotels(hotelsData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Load rooms for selected hotel
  const loadRooms = async (hotelId) => {
    try {
      setLoading(true);
      setError(null);
      const roomsData = await roomService.getRoomsByHotelId(hotelId);
      setRooms(roomsData);
      setSelectedHotel(hotelId);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Load reviews for selected hotel
  const loadReviews = async (hotelId) => {
    try {
      setLoading(true);
      setError(null);
      const reviewsData = await reviewService.getReviewsByHotelId(hotelId);
      setReviews(reviewsData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Create a booking
  const createBooking = async (roomId, checkIn, checkOut, guests) => {
    try {
      setLoading(true);
      setError(null);
      
      const bookingData = {
        roomId,
        checkIn,
        checkOut,
        guests,
        userId: 'current-user-id' // This would come from auth context
      };
      
      const booking = await bookingService.createBooking(bookingData);
      alert('Booking created successfully!');
      return booking;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Check room availability
  const checkAvailability = async (roomId, checkIn, checkOut) => {
    try {
      const availability = await roomService.checkRoomAvailability(roomId, checkIn, checkOut);
      return availability;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  // Create a review
  const createReview = async (hotelId, rating, comment) => {
    try {
      setLoading(true);
      setError(null);
      
      const reviewData = {
        hotelId,
        rating,
        comment,
        userId: 'current-user-id' // This would come from auth context
      };
      
      const review = await reviewService.createReview(reviewData);
      alert('Review created successfully!');
      
      // Reload reviews for the hotel
      await loadReviews(hotelId);
      return review;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">
      <div className="text-lg">Loading...</div>
    </div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Hotel Booking API Example</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Hotels Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Hotels</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {hotels.map((hotel) => (
            <div key={hotel.id} className="border rounded-lg p-4 shadow-md">
              <h3 className="text-lg font-semibold mb-2">{hotel.name}</h3>
              <p className="text-gray-600 mb-2">{hotel.description}</p>
              <p className="text-sm text-gray-500 mb-3">{hotel.location}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => loadRooms(hotel.id)}
                  className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                >
                  View Rooms
                </button>
                <button
                  onClick={() => loadReviews(hotel.id)}
                  className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
                >
                  View Reviews
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Rooms Section */}
      {rooms.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Rooms</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {rooms.map((room) => (
              <div key={room.id} className="border rounded-lg p-4 shadow-md">
                <h3 className="text-lg font-semibold mb-2">{room.name}</h3>
                <p className="text-gray-600 mb-2">{room.description}</p>
                <p className="text-sm text-gray-500 mb-2">Price: ${room.price}/night</p>
                <p className="text-sm text-gray-500 mb-3">Capacity: {room.capacity} guests</p>
                <button
                  onClick={() => createBooking(room.id, '2024-01-01', '2024-01-03', 2)}
                  className="bg-purple-500 text-white px-3 py-1 rounded text-sm hover:bg-purple-600"
                >
                  Book Now
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Reviews Section */}
      {reviews.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="border rounded-lg p-4 shadow-md">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">Rating: {review.rating}/5</span>
                  <span className="text-sm text-gray-500">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HotelBookingExample;
