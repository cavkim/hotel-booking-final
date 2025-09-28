// Hotel API Service
import apiClient from '../helpers/axioHelper';

const hotelService = {
  // Create hotel
  createHotel: async (hotelData) => {
    try {
      const response = await apiClient.post('/hotels', hotelData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create hotel');
    }
  },

  // Get hotel by ID
  getHotelById: async (hotelId) => {
    try {
      const response = await apiClient.get(`/hotels/${hotelId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch hotel');
    }
  },

  // Get all hotels
  getAllHotels: async () => {
    try {
      const response = await apiClient.get('/hotels');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch hotels');
    }
  },

  // Update hotel
  updateHotel: async (hotelId, updateData) => {
    try {
      const response = await apiClient.put(`/hotels/${hotelId}`, updateData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update hotel');
    }
  },

  // Delete hotel
  deleteHotel: async (hotelId) => {
    try {
      const response = await apiClient.delete(`/hotels/${hotelId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete hotel');
    }
  },

  // Search hotels by location
  searchHotelsByLocation: async (location) => {
    try {
      const response = await apiClient.get('/hotels', {
        params: { location }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to search hotels');
    }
  },

  // Get hotels with filters
  getHotelsWithFilters: async (filters) => {
    try {
      const response = await apiClient.get('/hotels', {
        params: filters
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch hotels with filters');
    }
  }
};

export default hotelService;
