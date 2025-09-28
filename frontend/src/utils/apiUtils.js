/**
 * API Utilities Module
 * Common utility functions for API operations
 */

import { apiMethods } from '../config/apiClient';
import { API_CONFIG, API_ENDPOINTS, ERROR_MESSAGES, SUCCESS_MESSAGES } from '../config/apiConfig';

// Generic API response handler
export const handleApiResponse = (response, successMessage = null) => {
  if (response && response.success !== false) {
    if (successMessage && API_CONFIG.DEBUG) {
      console.log(`✅ ${successMessage}`);
    }
    return {
      success: true,
      data: response.data || response,
      message: successMessage || SUCCESS_MESSAGES.OPERATION_SUCCESS,
    };
  }
  
  return {
    success: false,
    data: null,
    message: response.message || ERROR_MESSAGES.SERVER_ERROR,
  };
};

// Generic API error handler
export const handleApiError = (error, customMessage = null) => {
  const message = customMessage || error.message || ERROR_MESSAGES.SERVER_ERROR;
  
  if (API_CONFIG.DEBUG) {
    console.error('❌ API Error:', error);
  }
  
  return {
    success: false,
    data: null,
    message,
    error: error,
  };
};

// Retry mechanism for failed requests
export const retryRequest = async (requestFn, maxRetries = 3, delay = 1000) => {
  let lastError;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await requestFn();
    } catch (error) {
      lastError = error;
      
      // Don't retry for certain error types
      if (error.status === 401 || error.status === 403 || error.status === 404) {
        throw error;
      }
      
      if (i < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)));
      }
    }
  }
  
  throw lastError;
};

// Request timeout handler
export const withTimeout = (promise, timeoutMs) => {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error(ERROR_MESSAGES.TIMEOUT_ERROR)), timeoutMs)
    ),
  ]);
};

// Pagination helper
export const createPaginationParams = (page = 1, limit = 10, sortBy = null, sortOrder = 'asc') => {
  const params = {
    page: Math.max(1, page),
    limit: Math.min(100, Math.max(1, limit)),
  };
  
  if (sortBy) {
    params.sortBy = sortBy;
    params.sortOrder = sortOrder === 'desc' ? 'desc' : 'asc';
  }
  
  return params;
};

// Date range helper for API queries
export const createDateRangeParams = (startDate, endDate) => {
  const params = {};
  
  if (startDate) {
    params.startDate = new Date(startDate).toISOString();
  }
  
  if (endDate) {
    params.endDate = new Date(endDate).toISOString();
  }
  
  return params;
};

// Search parameters helper
export const createSearchParams = (query, filters = {}) => {
  const params = {};
  
  if (query && query.trim()) {
    params.q = query.trim();
  }
  
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== '') {
      params[key] = value;
    }
  });
  
  return params;
};

// File upload helper
export const createFormData = (data, fileField = 'file') => {
  const formData = new FormData();
  
  Object.entries(data).forEach(([key, value]) => {
    if (value instanceof File) {
      formData.append(fileField, value);
    } else if (value !== null && value !== undefined) {
      formData.append(key, value);
    }
  });
  
  return formData;
};

// API endpoint builder
export const buildEndpoint = (endpoint, params = {}) => {
  let url = endpoint;
  
  // Replace path parameters
  Object.entries(params).forEach(([key, value]) => {
    if (typeof value !== 'undefined' && value !== null) {
      url = url.replace(`:${key}`, encodeURIComponent(value));
    }
  });
  
  return url;
};

// Query string builder
export const buildQueryString = (params) => {
  const searchParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== '') {
      if (Array.isArray(value)) {
        value.forEach(item => searchParams.append(key, item));
      } else {
        searchParams.append(key, value);
      }
    }
  });
  
  return searchParams.toString();
};

// Cache helper for API responses
export const createCacheKey = (endpoint, params = {}) => {
  const sortedParams = Object.keys(params)
    .sort()
    .reduce((result, key) => {
      result[key] = params[key];
      return result;
    }, {});
  
  return `${endpoint}_${JSON.stringify(sortedParams)}`;
};

// Debounce helper for search requests
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Throttle helper for API requests
export const throttle = (func, limit) => {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Export all utilities
export default {
  handleApiResponse,
  handleApiError,
  retryRequest,
  withTimeout,
  createPaginationParams,
  createDateRangeParams,
  createSearchParams,
  createFormData,
  buildEndpoint,
  buildQueryString,
  createCacheKey,
  debounce,
  throttle,
};
