/**
 * Centralized API Configuration Module
 * This module handles all API-related configurations and environment variables
 */

// Environment variable validation
const validateEnvVar = (key, defaultValue = null) => {
  const value = process.env[key];
  if (!value && defaultValue === null) {
    console.warn(`Warning: Environment variable ${key} is not set`);
    return null;
  }
  return value || defaultValue;
};

// API Configuration
export const API_CONFIG = {
  // Base URLs
  BASE_URL: validateEnvVar("REACT_APP_API_URL", "https://api.bakongcity.city"),
  PAYMENT_URL: validateEnvVar(
    "REACT_APP_PAYMENT_API_URL",
    "http://localhost:5501/v1/payment"
  ),

  // Timeouts
  TIMEOUT: parseInt(validateEnvVar("REACT_APP_API_TIMEOUT", "10000")),
  PAYMENT_TIMEOUT: parseInt(
    validateEnvVar("REACT_APP_PAYMENT_TIMEOUT", "15000")
  ),

  // Version
  VERSION: validateEnvVar("REACT_APP_API_VERSION", "v1"),

  // Environment
  ENV: validateEnvVar("REACT_APP_ENV", "development"),
  DEBUG: validateEnvVar("REACT_APP_DEBUG", "true") === "true",
};

// Authentication Configuration
export const AUTH_CONFIG = {
  TOKEN_KEY: validateEnvVar("REACT_APP_TOKEN_KEY", "hotel_booking_token"),
  USER_KEY: validateEnvVar("REACT_APP_USER_KEY", "hotel_booking_user"),
  SESSION_TIMEOUT: parseInt(validateEnvVar("REACT_APP_SESSION_TIMEOUT", "30")),
};

// Application Configuration
export const APP_CONFIG = {
  NAME: validateEnvVar("REACT_APP_NAME", "Hotel Booking System"),
  VERSION: validateEnvVar("REACT_APP_VERSION", "1.0.0"),
  ENV: API_CONFIG.ENV,
  DEBUG: API_CONFIG.DEBUG,
};

// Payment Configuration
export const PAYMENT_CONFIG = {
  BASE_URL: API_CONFIG.PAYMENT_URL,
  TIMEOUT: API_CONFIG.PAYMENT_TIMEOUT,
  SUCCESS_URL: validateEnvVar(
    "REACT_APP_PAYMENT_SUCCESS_URL",
    "http://localhost:3000/booking-confirmation"
  ),
  CANCEL_URL: validateEnvVar(
    "REACT_APP_PAYMENT_CANCEL_URL",
    "http://localhost:3000/booking"
  ),
};

// External Services Configuration
export const EXTERNAL_SERVICES = {
  GOOGLE_MAPS_API_KEY: validateEnvVar("REACT_APP_GOOGLE_MAPS_API_KEY"),
  EMAIL_API_KEY: validateEnvVar("REACT_APP_EMAIL_API_KEY"),
  SMS_API_KEY: validateEnvVar("REACT_APP_SMS_API_KEY"),
};

// File Upload Configuration
export const UPLOAD_CONFIG = {
  MAX_FILE_SIZE: parseInt(validateEnvVar("REACT_APP_MAX_FILE_SIZE", "5242880")),
  ALLOWED_FILE_TYPES: validateEnvVar(
    "REACT_APP_ALLOWED_FILE_TYPES",
    "image/jpeg,image/png,image/gif,application/pdf"
  ).split(","),
};

// Feature Flags
export const FEATURE_FLAGS = {
  ENABLE_PAYMENT: validateEnvVar("REACT_APP_ENABLE_PAYMENT", "true") === "true",
  ENABLE_NOTIFICATIONS:
    validateEnvVar("REACT_APP_ENABLE_NOTIFICATIONS", "true") === "true",
  ENABLE_ANALYTICS:
    validateEnvVar("REACT_APP_ENABLE_ANALYTICS", "false") === "true",
  ENABLE_DEBUG_TOOLS:
    validateEnvVar("REACT_APP_ENABLE_DEBUG_TOOLS", "true") === "true",
  ENABLE_API_TESTER:
    validateEnvVar("REACT_APP_ENABLE_API_TESTER", "true") === "true",
  ENABLE_MOCK_SERVICES:
    validateEnvVar("REACT_APP_ENABLE_MOCK_SERVICES", "false") === "true",
  ENABLE_PERFORMANCE_MONITORING:
    validateEnvVar("REACT_APP_ENABLE_PERFORMANCE_MONITORING", "false") ===
    "true",
};

// API Endpoints Configuration
export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: "/v1/auth/login",
    REGISTER: "/v1/auth/register",
    LOGOUT: "/v1/auth/logout",
    REFRESH: "/v1/auth/refresh",
    PROFILE: "/auth/profile",
    FORGOT_PASSWORD: "/auth/forgot-password",
    RESET_PASSWORD: "/auth/reset-password",
  },

  // Hotels
  HOTELS: {
    LIST: "/hotels",
    DETAIL: (id) => `/hotels/${id}`,
    SEARCH: "/hotels/search",
    FEATURED: "/hotels/featured",
    NEARBY: "/hotels/nearby",
  },

  // Rooms
  ROOMS: {
    LIST: "/rooms",
    DETAIL: (id) => `/rooms/${id}`,
    AVAILABLE: "/rooms/available",
    TYPES: "/room-types",
    AMENITIES: "/room-amenities",
  },

  // Bookings
  BOOKINGS: {
    LIST: "/bookings",
    CREATE: "/bookings",
    DETAIL: (id) => `/bookings/${id}`,
    UPDATE: (id) => `/bookings/${id}`,
    CANCEL: (id) => `/bookings/${id}/cancel`,
    HISTORY: "/bookings/history",
  },

  // Payments
  PAYMENTS: {
    CREATE: "/payments",
    PROCESS: "/payments/process",
    VERIFY: "/payments/verify",
    REFUND: "/payments/refund",
    METHODS: "/payments/methods",
  },

  // Reviews
  REVIEWS: {
    LIST: "/reviews",
    CREATE: "/reviews",
    DETAIL: (id) => `/reviews/${id}`,
    UPDATE: (id) => `/reviews/${id}`,
    DELETE: (id) => `/reviews/${id}`,
    HOTEL_REVIEWS: (hotelId) => `/reviews/hotel/${hotelId}`,
  },

  // Images
  IMAGES: {
    UPLOAD: "/images/upload",
    DELETE: (id) => `/images/${id}`,
    HOTEL_IMAGES: (hotelId) => `/images/hotel/${hotelId}`,
    ROOM_IMAGES: (roomId) => `/images/room/${roomId}`,
  },

  // Activities
  ACTIVITIES: {
    LIST: "/activities",
    DETAIL: (id) => `/activities/${id}`,
    BOOK: "/activities/book",
    AVAILABLE: "/activities/available",
  },
};

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: "Network error. Please check your internet connection.",
  TIMEOUT_ERROR: "Request timeout. Please try again.",
  UNAUTHORIZED: "You are not authorized to perform this action.",
  FORBIDDEN: "Access denied.",
  NOT_FOUND: "The requested resource was not found.",
  SERVER_ERROR: "Server error. Please try again later.",
  VALIDATION_ERROR: "Please check your input and try again.",
  PAYMENT_ERROR: "Payment processing failed. Please try again.",
  BOOKING_ERROR: "Booking failed. Please try again.",
};

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: "Login successful!",
  REGISTER_SUCCESS: "Registration successful!",
  BOOKING_SUCCESS: "Booking created successfully!",
  PAYMENT_SUCCESS: "Payment processed successfully!",
  PROFILE_UPDATE_SUCCESS: "Profile updated successfully!",
  PASSWORD_RESET_SUCCESS: "Password reset successfully!",
};

// Default export with all configurations
export default {
  API_CONFIG,
  AUTH_CONFIG,
  APP_CONFIG,
  PAYMENT_CONFIG,
  EXTERNAL_SERVICES,
  UPLOAD_CONFIG,
  FEATURE_FLAGS,
  API_ENDPOINTS,
  HTTP_STATUS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
};
