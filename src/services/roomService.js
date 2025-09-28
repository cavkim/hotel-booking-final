// Room API Service
import apiClient from '../helpers/axioHelper';

const roomService = {
  // Create room
  createRoom: async (roomData) => {
    try {
      const response = await apiClient.post('/rooms', roomData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create room');
    }
  },

  // Get room by ID
  getRoomById: async (roomId) => {
    try {
      const response = await apiClient.get(`/rooms/${roomId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch room');
    }
  },

  // Get all rooms
  getAllRooms: async () => {
    try {
      const response = await apiClient.get('/rooms');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch rooms');
    }
  },

  // Update room
  updateRoom: async (roomId, updateData) => {
    try {
      const response = await apiClient.put(`/rooms/${roomId}`, updateData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update room');
    }
  },

  // Delete room
  deleteRoom: async (roomId) => {
    try {
      const response = await apiClient.delete(`/rooms/${roomId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete room');
    }
  },

  // Get rooms by hotel ID
  getRoomsByHotelId: async (hotelId) => {
    try {
      const response = await apiClient.get(`/rooms/hotel/${hotelId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch rooms for hotel');
    }
  },

  // Check room availability
  checkRoomAvailability: async (roomId, checkIn, checkOut) => {
    try {
      const response = await apiClient.get(`/rooms/${roomId}/availability`, {
        params: { checkIn, checkOut }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to check room availability');
    }
  },

  // Get rooms with filters
  getRoomsWithFilters: async (filters) => {
    try {
      const response = await apiClient.get('/rooms', {
        params: filters
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch rooms with filters');
    }
  }
};

export default roomService;
