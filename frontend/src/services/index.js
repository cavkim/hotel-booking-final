// API Services Index
// Centralized export for all API services

import authService from './authService';
import bookingService from './bookingService';
import hotelService from './hotelService';
import roomService from './roomService';
import roomTypeService from './roomTypeService';
import reviewService from './reviewService';
import paymentService from './paymentService';
import hotelImageService from './hotelImageService';

// Export all services
export {
  authService,
  bookingService,
  hotelService,
  roomService,
  roomTypeService,
  reviewService,
  paymentService,
  hotelImageService
};

// Default export with all services
export default {
  auth: authService,
  booking: bookingService,
  hotel: hotelService,
  room: roomService,
  roomType: roomTypeService,
  review: reviewService,
  payment: paymentService,
  hotelImage: hotelImageService
};
