/**
 * Enhanced API Client with centralized configuration and error handling
 */

import axios from 'axios';
import { API_CONFIG, AUTH_CONFIG, HTTP_STATUS, ERROR_MESSAGES } from '../config/apiConfig';

// Create axios instance with default configuration
const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor to add auth token and logging
apiClient.interceptors.request.use(
  (config) => {
    // Add authentication token
    const token = localStorage.getItem(AUTH_CONFIG.TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Add request ID for tracking
    config.headers['X-Request-ID'] = generateRequestId();

    // Log request in debug mode
    if (API_CONFIG.DEBUG) {
      console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`, {
        headers: config.headers,
        data: config.data,
        params: config.params,
      });
    }

    return config;
  },
  (error) => {
    if (API_CONFIG.DEBUG) {
      console.error('❌ Request Error:', error);
    }
    return Promise.reject(error);
  }
);

// Response interceptor for error handling and logging
apiClient.interceptors.response.use(
  (response) => {
    // Log response in debug mode
    if (API_CONFIG.DEBUG) {
      console.log(`✅ API Response: ${response.config.method?.toUpperCase()} ${response.config.url}`, {
        status: response.status,
        data: response.data,
      });
    }

    return response;
  },
  (error) => {
    const { response, request, message } = error;

    // Log error in debug mode
    if (API_CONFIG.DEBUG) {
      console.error(`❌ API Error: ${error.config?.method?.toUpperCase()} ${error.config?.url}`, {
        status: response?.status,
        data: response?.data,
        message: message,
      });
    }

    // Handle different types of errors
    if (response) {
      // Server responded with error status
      const errorMessage = getErrorMessage(response.status, response.data?.message);
      
      switch (response.status) {
        case HTTP_STATUS.UNAUTHORIZED:
          handleUnauthorized();
          break;
        case HTTP_STATUS.FORBIDDEN:
          handleForbidden();
          break;
        case HTTP_STATUS.NOT_FOUND:
          handleNotFound();
          break;
        case HTTP_STATUS.INTERNAL_SERVER_ERROR:
          handleServerError();
          break;
        default:
          break;
      }

      return Promise.reject({
        ...error,
        message: errorMessage,
        status: response.status,
        data: response.data,
      });
    } else if (request) {
      // Request was made but no response received
      return Promise.reject({
        ...error,
        message: ERROR_MESSAGES.NETWORK_ERROR,
        type: 'NETWORK_ERROR',
      });
    } else {
      // Something else happened
      return Promise.reject({
        ...error,
        message: ERROR_MESSAGES.SERVER_ERROR,
        type: 'UNKNOWN_ERROR',
      });
    }
  }
);

// Helper functions
const generateRequestId = () => {
  return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

const getErrorMessage = (status, serverMessage) => {
  if (serverMessage) return serverMessage;

  switch (status) {
    case HTTP_STATUS.BAD_REQUEST:
      return ERROR_MESSAGES.VALIDATION_ERROR;
    case HTTP_STATUS.UNAUTHORIZED:
      return ERROR_MESSAGES.UNAUTHORIZED;
    case HTTP_STATUS.FORBIDDEN:
      return ERROR_MESSAGES.FORBIDDEN;
    case HTTP_STATUS.NOT_FOUND:
      return ERROR_MESSAGES.NOT_FOUND;
    case HTTP_STATUS.INTERNAL_SERVER_ERROR:
      return ERROR_MESSAGES.SERVER_ERROR;
    default:
      return ERROR_MESSAGES.SERVER_ERROR;
  }
};

const handleUnauthorized = () => {
  // Clear stored authentication data
  localStorage.removeItem(AUTH_CONFIG.TOKEN_KEY);
  localStorage.removeItem(AUTH_CONFIG.USER_KEY);
  
  // Redirect to login page
  if (window.location.pathname !== '/signin') {
    window.location.href = '/signin';
  }
};

const handleForbidden = () => {
  // Show error message or redirect to appropriate page
  console.warn('Access forbidden');
};

const handleNotFound = () => {
  // Handle 404 errors
  console.warn('Resource not found');
};

const handleServerError = () => {
  // Handle 500 errors
  console.error('Server error occurred');
};

// API Client methods with enhanced error handling
export const apiMethods = {
  // GET request
  get: async (url, config = {}) => {
    try {
      const response = await apiClient.get(url, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // POST request
  post: async (url, data = {}, config = {}) => {
    try {
      const response = await apiClient.post(url, data, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // PUT request
  put: async (url, data = {}, config = {}) => {
    try {
      const response = await apiClient.put(url, data, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // PATCH request
  patch: async (url, data = {}, config = {}) => {
    try {
      const response = await apiClient.patch(url, data, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // DELETE request
  delete: async (url, config = {}) => {
    try {
      const response = await apiClient.delete(url, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Upload file
  upload: async (url, formData, config = {}) => {
    try {
      const response = await apiClient.post(url, formData, {
        ...config,
        headers: {
          'Content-Type': 'multipart/form-data',
          ...config.headers,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Download file
  download: async (url, config = {}) => {
    try {
      const response = await apiClient.get(url, {
        ...config,
        responseType: 'blob',
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

// Export the configured axios instance and methods
export default apiClient;
export { API_CONFIG, AUTH_CONFIG };
