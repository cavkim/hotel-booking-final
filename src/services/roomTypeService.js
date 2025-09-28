// Room Type API Service
import apiClient from '../helpers/axioHelper';

const roomTypeService = {
  // Create room type
  createRoomType: async (roomTypeData) => {
    try {
      const response = await apiClient.post('/room-types', roomTypeData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create room type');
    }
  },

  // Get room type by ID
  getRoomTypeById: async (roomTypeId) => {
    try {
      const response = await apiClient.get(`/room-types/${roomTypeId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch room type');
    }
  },

  // Get all room types
  getAllRoomTypes: async () => {
    try {
      const response = await apiClient.get('/room-types');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch room types');
    }
  },

  // Update room type
  updateRoomType: async (roomTypeId, updateData) => {
    try {
      const response = await apiClient.put(`/room-types/${roomTypeId}`, updateData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update room type');
    }
  },

  // Delete room type
  deleteRoomType: async (roomTypeId) => {
    try {
      const response = await apiClient.delete(`/room-types/${roomTypeId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete room type');
    }
  },

  // Get room types by hotel ID
  getRoomTypesByHotelId: async (hotelId) => {
    try {
      const response = await apiClient.get(`/room-types/hotel/${hotelId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch room types for hotel');
    }
  }
};

export default roomTypeService;
