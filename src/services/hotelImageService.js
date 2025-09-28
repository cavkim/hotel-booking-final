// Hotel Image API Service
import apiClient from '../helpers/axioHelper';

const hotelImageService = {
  // Create hotel image
  createHotelImage: async (imageData) => {
    try {
      const formData = new FormData();
      formData.append('image', imageData.image);
      formData.append('hotelId', imageData.hotelId);
      formData.append('description', imageData.description || '');
      formData.append('isPrimary', imageData.isPrimary || false);

      const response = await apiClient.post('/hotel-images', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create hotel image');
    }
  },

  // Get hotel image by ID
  getHotelImageById: async (imageId) => {
    try {
      const response = await apiClient.get(`/hotel-images/${imageId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch hotel image');
    }
  },

  // Get all hotel images
  getAllHotelImages: async () => {
    try {
      const response = await apiClient.get('/hotel-images');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch hotel images');
    }
  },

  // Update hotel image
  updateHotelImage: async (imageId, updateData) => {
    try {
      const response = await apiClient.put(`/hotel-images/${imageId}`, updateData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update hotel image');
    }
  },

  // Delete hotel image
  deleteHotelImage: async (imageId) => {
    try {
      const response = await apiClient.delete(`/hotel-images/${imageId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete hotel image');
    }
  },

  // Get images by hotel ID
  getImagesByHotelId: async (hotelId) => {
    try {
      const response = await apiClient.get(`/hotel-images/hotel/${hotelId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch images for hotel');
    }
  },

  // Set primary image
  setPrimaryImage: async (imageId) => {
    try {
      const response = await apiClient.put(`/hotel-images/${imageId}/set-primary`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to set primary image');
    }
  },

  // Upload multiple images
  uploadMultipleImages: async (hotelId, images) => {
    try {
      const formData = new FormData();
      formData.append('hotelId', hotelId);
      
      images.forEach((image, index) => {
        formData.append(`images`, image);
      });

      const response = await apiClient.post('/hotel-images/upload-multiple', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to upload multiple images');
    }
  }
};

export default hotelImageService;
