import React, { useState } from 'react';
import { 
  authService, 
  hotelService, 
  roomService, 
  bookingService, 
  reviewService, 
  paymentService
} from '../services';

const APITester = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [testData, setTestData] = useState({
    email: 'test@example.com',
    password: 'password123',
    hotelId: '1',
    roomId: '1',
    bookingId: '1',
    reviewId: '1'
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

  // Test Authentication Endpoints
  const testAuthEndpoints = async () => {
    setLoading(true);
    addResult('Auth Test', 'info', 'Starting authentication tests...');

    try {
      // Test Register
      try {
        const registerData = {
          email: testData.email,
          password: testData.password,
          name: 'Test User'
        };
        const registerResult = await authService.register(registerData);
        addResult('Register', 'success', 'Registration successful', registerResult);
      } catch (error) {
        addResult('Register', 'error', error.message);
      }

      // Test Login
      try {
        const loginData = {
          email: testData.email,
          password: testData.password
        };
        const loginResult = await authService.login(loginData);
        addResult('Login', 'success', 'Login successful', loginResult);
      } catch (error) {
        addResult('Login', 'error', error.message);
      }

      // Test Token Verification
      try {
        const isVerified = await authService.verifyToken();
        addResult('Token Verify', isVerified ? 'success' : 'error', 
          isVerified ? 'Token is valid' : 'Token verification failed');
      } catch (error) {
        addResult('Token Verify', 'error', error.message);
      }

    } catch (error) {
      addResult('Auth Test', 'error', 'Authentication test failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Test Hotel Endpoints
  const testHotelEndpoints = async () => {
    setLoading(true);
    addResult('Hotel Test', 'info', 'Starting hotel tests...');

    try {
      // Test Get All Hotels
      try {
        const hotels = await hotelService.getAllHotels();
        addResult('Get Hotels', 'success', `Found ${hotels.length} hotels`, hotels);
      } catch (error) {
        addResult('Get Hotels', 'error', error.message);
      }

      // Test Get Hotel by ID
      try {
        const hotel = await hotelService.getHotelById(testData.hotelId);
        addResult('Get Hotel by ID', 'success', 'Hotel retrieved successfully', hotel);
      } catch (error) {
        addResult('Get Hotel by ID', 'error', error.message);
      }

      // Test Create Hotel
      try {
        const hotelData = {
          name: 'Test Hotel',
          description: 'A test hotel',
          location: 'Test City',
          amenities: ['WiFi', 'Pool']
        };
        const newHotel = await hotelService.createHotel(hotelData);
        addResult('Create Hotel', 'success', 'Hotel created successfully', newHotel);
      } catch (error) {
        addResult('Create Hotel', 'error', error.message);
      }

    } catch (error) {
      addResult('Hotel Test', 'error', 'Hotel test failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Test Room Endpoints
  const testRoomEndpoints = async () => {
    setLoading(true);
    addResult('Room Test', 'info', 'Starting room tests...');

    try {
      // Test Get All Rooms
      try {
        const rooms = await roomService.getAllRooms();
        addResult('Get Rooms', 'success', `Found ${rooms.length} rooms`, rooms);
      } catch (error) {
        addResult('Get Rooms', 'error', error.message);
      }

      // Test Get Room by ID
      try {
        const room = await roomService.getRoomById(testData.roomId);
        addResult('Get Room by ID', 'success', 'Room retrieved successfully', room);
      } catch (error) {
        addResult('Get Room by ID', 'error', error.message);
      }

      // Test Get Rooms by Hotel
      try {
        const hotelRooms = await roomService.getRoomsByHotelId(testData.hotelId);
        addResult('Get Rooms by Hotel', 'success', `Found ${hotelRooms.length} rooms for hotel`, hotelRooms);
      } catch (error) {
        addResult('Get Rooms by Hotel', 'error', error.message);
      }

      // Test Room Availability
      try {
        const availability = await roomService.checkRoomAvailability(
          testData.roomId, 
          '2024-01-01', 
          '2024-01-03'
        );
        addResult('Check Availability', 'success', 'Availability checked', availability);
      } catch (error) {
        addResult('Check Availability', 'error', error.message);
      }

    } catch (error) {
      addResult('Room Test', 'error', 'Room test failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Test Booking Endpoints
  const testBookingEndpoints = async () => {
    setLoading(true);
    addResult('Booking Test', 'info', 'Starting booking tests...');

    try {
      // Test Get All Bookings
      try {
        const bookings = await bookingService.getAllBookings();
        addResult('Get Bookings', 'success', `Found ${bookings.length} bookings`, bookings);
      } catch (error) {
        addResult('Get Bookings', 'error', error.message);
      }

      // Test Create Booking
      try {
        const bookingData = {
          roomId: testData.roomId,
          checkIn: '2024-01-01',
          checkOut: '2024-01-03',
          guests: 2,
          userId: 'test-user-id'
        };
        const booking = await bookingService.createBooking(bookingData);
        addResult('Create Booking', 'success', 'Booking created successfully', booking);
      } catch (error) {
        addResult('Create Booking', 'error', error.message);
      }

      // Test Get Booking by ID
      try {
        const booking = await bookingService.getBooking(testData.bookingId);
        addResult('Get Booking by ID', 'success', 'Booking retrieved successfully', booking);
      } catch (error) {
        addResult('Get Booking by ID', 'error', error.message);
      }

    } catch (error) {
      addResult('Booking Test', 'error', 'Booking test failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Test Review Endpoints
  const testReviewEndpoints = async () => {
    setLoading(true);
    addResult('Review Test', 'info', 'Starting review tests...');

    try {
      // Test Get All Reviews
      try {
        const reviews = await reviewService.getAllReviews();
        addResult('Get Reviews', 'success', `Found ${reviews.length} reviews`, reviews);
      } catch (error) {
        addResult('Get Reviews', 'error', error.message);
      }

      // Test Get Reviews by Hotel
      try {
        const hotelReviews = await reviewService.getReviewsByHotelId(testData.hotelId);
        addResult('Get Reviews by Hotel', 'success', `Found ${hotelReviews.length} reviews for hotel`, hotelReviews);
      } catch (error) {
        addResult('Get Reviews by Hotel', 'error', error.message);
      }

      // Test Create Review
      try {
        const reviewData = {
          hotelId: testData.hotelId,
          rating: 5,
          comment: 'Great hotel!',
          userId: 'test-user-id'
        };
        const review = await reviewService.createReview(reviewData);
        addResult('Create Review', 'success', 'Review created successfully', review);
      } catch (error) {
        addResult('Create Review', 'error', error.message);
      }

    } catch (error) {
      addResult('Review Test', 'error', 'Review test failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Test Payment Endpoints
  const testPaymentEndpoints = async () => {
    setLoading(true);
    addResult('Payment Test', 'info', 'Starting payment tests...');

    try {
      // Test Generate QR Image
      try {
        const qrData = await paymentService.generateQRImage({
          amount: 100,
          currency: 'USD',
          description: 'Test payment'
        });
        addResult('Generate QR', 'success', 'QR image generated successfully', qrData);
      } catch (error) {
        addResult('Generate QR', 'error', error.message);
      }

      // Test Process Payment
      try {
        const paymentData = {
          amount: 100,
          currency: 'USD',
          method: 'aba',
          bookingId: testData.bookingId
        };
        const payment = await paymentService.processPayment(paymentData);
        addResult('Process Payment', 'success', 'Payment processed successfully', payment);
      } catch (error) {
        addResult('Process Payment', 'error', error.message);
      }

      // Test Simulate Callback
      try {
        const callbackResult = await paymentService.simulateCallback('test-txn-123', 'success');
        addResult('Simulate Callback', 'success', 'Callback simulated successfully', callbackResult);
      } catch (error) {
        addResult('Simulate Callback', 'error', error.message);
      }

      // Test Create Payment with QR
      try {
        const paymentWithQR = await paymentService.createPaymentWithQR({
          amount: 50,
          currency: 'USD',
          description: 'Test payment with QR'
        });
        addResult('Create Payment with QR', 'success', 'Payment with QR created successfully', paymentWithQR);
      } catch (error) {
        addResult('Create Payment with QR', 'error', error.message);
      }

    } catch (error) {
      addResult('Payment Test', 'error', 'Payment test failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Test All Endpoints
  const testAllEndpoints = async () => {
    clearResults();
    addResult('API Test', 'info', 'Starting comprehensive API test...');
    
    await testAuthEndpoints();
    await testHotelEndpoints();
    await testRoomEndpoints();
    await testBookingEndpoints();
    await testReviewEndpoints();
    await testPaymentEndpoints();
    
    addResult('API Test', 'success', 'All API tests completed!');
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
      <h1 className="text-3xl font-bold mb-8">API Testing Dashboard</h1>
      
      {/* Test Data Configuration */}
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">Test Data Configuration</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={testData.email}
              onChange={(e) => setTestData(prev => ({ ...prev, email: e.target.value }))}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              value={testData.password}
              onChange={(e) => setTestData(prev => ({ ...prev, password: e.target.value }))}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Hotel ID</label>
            <input
              type="text"
              value={testData.hotelId}
              onChange={(e) => setTestData(prev => ({ ...prev, hotelId: e.target.value }))}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Room ID</label>
            <input
              type="text"
              value={testData.roomId}
              onChange={(e) => setTestData(prev => ({ ...prev, roomId: e.target.value }))}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
        </div>
      </div>

      {/* Test Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        <button
          onClick={testAllEndpoints}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          Test All APIs
        </button>
        <button
          onClick={testAuthEndpoints}
          disabled={loading}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
        >
          Test Auth
        </button>
        <button
          onClick={testHotelEndpoints}
          disabled={loading}
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 disabled:opacity-50"
        >
          Test Hotels
        </button>
        <button
          onClick={testRoomEndpoints}
          disabled={loading}
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 disabled:opacity-50"
        >
          Test Rooms
        </button>
        <button
          onClick={testBookingEndpoints}
          disabled={loading}
          className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 disabled:opacity-50"
        >
          Test Bookings
        </button>
        <button
          onClick={testReviewEndpoints}
          disabled={loading}
          className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 disabled:opacity-50"
        >
          Test Reviews
        </button>
        <button
          onClick={testPaymentEndpoints}
          disabled={loading}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 disabled:opacity-50"
        >
          Test Payments
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
          <p className="mt-2 text-gray-600">Testing APIs...</p>
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
    </div>
  );
};

export default APITester;
