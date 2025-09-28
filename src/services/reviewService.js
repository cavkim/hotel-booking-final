// Review API Service
import apiClient from '../helpers/axioHelper';

const reviewService = {
  // Create review
  createReview: async (reviewData) => {
    try {
      const response = await apiClient.post('/reviews', reviewData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create review');
    }
  },

  // Get review by ID
  getReviewById: async (reviewId) => {
    try {
      const response = await apiClient.get(`/reviews/${reviewId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch review');
    }
  },

  // Get all reviews
  getAllReviews: async () => {
    try {
      const response = await apiClient.get('/reviews');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch reviews');
    }
  },

  // Get reviews by hotel ID
  getReviewsByHotelId: async (hotelId) => {
    try {
      const response = await apiClient.get(`/reviews/hotel/${hotelId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch reviews for hotel');
    }
  },

  // Update review
  updateReview: async (reviewId, updateData) => {
    try {
      const response = await apiClient.put(`/reviews/${reviewId}`, updateData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update review');
    }
  },

  // Delete review
  deleteReview: async (reviewId) => {
    try {
      const response = await apiClient.delete(`/reviews/${reviewId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete review');
    }
  },

  // Get reviews by user ID
  getReviewsByUserId: async (userId) => {
    try {
      const response = await apiClient.get(`/reviews/user/${userId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch reviews by user');
    }
  },

  // Get reviews with filters
  getReviewsWithFilters: async (filters) => {
    try {
      const response = await apiClient.get('/reviews', {
        params: filters
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch reviews with filters');
    }
  }
};

export default reviewService;
