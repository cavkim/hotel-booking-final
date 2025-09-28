/**
 * Legacy API Helper - DEPRECATED
 * Use src/config/apiClient.js instead for new implementations
 * This file is kept for backward compatibility
 */

import apiClient, { API_CONFIG } from '../config/apiClient';

// Export the new API client for backward compatibility
export default apiClient;

// Export API_BASE_URL for backward compatibility
export const API_BASE_URL = API_CONFIG.BASE_URL;

// Legacy warning
// console.warn('⚠️ axioHelper.js is deprecated. Please use src/config/apiClient.js for new implementations.');
