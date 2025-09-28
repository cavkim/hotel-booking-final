// Booking API Service
import apiClient from '../helpers/axioHelper';

const bookingService = {
  // Create booking
  createBooking: async (bookingData) => {
    try {
      const response = await apiClient.post('/bookings/create', bookingData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create booking');
    }
  },

  // Get all bookings
  getAllBookings: async () => {
    try {
      const response = await apiClient.get('/bookings');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch bookings');
    }
  },

  // Get booking by ID
  getBooking: async (bookingId) => {
    try {
      const response = await apiClient.get(`/bookings/${bookingId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch booking');
    }
  },

  // Get user bookings
  getUserBookings: async (userId) => {
    try {
      const response = await apiClient.get(`/bookings/user/${userId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch user bookings');
    }
  },

  // Cancel booking
  cancelBooking: async (bookingId) => {
    try {
      const response = await apiClient.delete(`/bookings/${bookingId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to cancel booking');
    }
  },

  // Update booking
  updateBooking: async (bookingId, updateData) => {
    try {
      const response = await apiClient.put(`/bookings/${bookingId}`, updateData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update booking');
    }
  },

  // Check room availability
  checkAvailability: async (roomId, checkIn, checkOut) => {
    try {
      const response = await apiClient.get(`/rooms/${roomId}/availability`, {
        params: { checkIn, checkOut }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to check availability');
    }
  }
};

export default bookingService;
