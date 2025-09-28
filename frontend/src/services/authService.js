// Authentication service for API calls
import { apiMethods } from '../config/apiClient';
import { API_ENDPOINTS, AUTH_CONFIG, SUCCESS_MESSAGES } from '../config/apiConfig';
import { handleApiResponse, handleApiError } from '../utils/apiUtils';

class AuthService {
  // Register user
  async register(userData) {
    try {
      const response = await apiMethods.post(API_ENDPOINTS.AUTH.REGISTER, userData);
      return handleApiResponse(response, SUCCESS_MESSAGES.REGISTER_SUCCESS);
    } catch (error) {
      return handleApiError(error, 'Registration failed. Please check your input and try again.');
    }
  }

  // Backward compatibility - alias for register
  async signUp(userData) {
    return this.register(userData);
  }

  // Verify user account
  async verify(verificationData) {
    try {
      const response = await apiMethods.post('/auth/verify', verificationData);
      return handleApiResponse(response, 'Account verified successfully');
    } catch (error) {
      return handleApiError(error, 'Verification failed. Please check your verification code.');
    }
  }

  // Login user
  async login(credentials) {
    try {
      // Validate credentials before sending
      if (!credentials.email || !credentials.password) {
        throw new Error('Email and password are required');
      }

      const response = await apiMethods.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
      
      // Store token and user data in localStorage
      if (response.token) {
        localStorage.setItem(AUTH_CONFIG.TOKEN_KEY, response.token);
        localStorage.setItem(AUTH_CONFIG.USER_KEY, JSON.stringify(response.user));
      }

      return handleApiResponse(response, SUCCESS_MESSAGES.LOGIN_SUCCESS);
    } catch (error) {
      return handleApiError(error, 'Login failed. Please check your credentials.');
    }
  }

  // Backward compatibility - alias for login
  async signIn(credentials) {
    return this.login(credentials);
  }

  // Sign out user
  signOut() {
    localStorage.removeItem(AUTH_CONFIG.TOKEN_KEY);
    localStorage.removeItem(AUTH_CONFIG.USER_KEY);
  }

  // Get current user from localStorage
  getCurrentUser() {
    const user = localStorage.getItem(AUTH_CONFIG.USER_KEY);
    return user ? JSON.parse(user) : null;
  }

  // Get token from localStorage
  getToken() {
    return localStorage.getItem(AUTH_CONFIG.TOKEN_KEY);
  }

  // Check if user is authenticated
  isAuthenticated() {
    const token = this.getToken();
    return !!token;
  }

  // Update user profile
  async updateProfile(profileData) {
    try {
      const response = await apiMethods.put(API_ENDPOINTS.AUTH.PROFILE, profileData);
      
      // Update stored user data
      if (response.user) {
        localStorage.setItem(AUTH_CONFIG.USER_KEY, JSON.stringify(response.user));
      }

      return handleApiResponse(response, SUCCESS_MESSAGES.PROFILE_UPDATE_SUCCESS);
    } catch (error) {
      return handleApiError(error, 'Profile update failed. Please try again.');
    }
  }

  // Upload profile image
  async uploadProfileImage(imageFile) {
    try {
      const formData = new FormData();
      formData.append('profileImage', imageFile);

      const response = await apiMethods.upload('/auth/upload-profile-image', formData);
      return handleApiResponse(response, 'Profile image uploaded successfully');
    } catch (error) {
      return handleApiError(error, 'Image upload failed. Please try again.');
    }
  }

  // Verify token with backend
  async verifyToken() {
    try {
      const token = this.getToken();
      if (!token) {
        return false;
      }

      const response = await apiMethods.get(API_ENDPOINTS.AUTH.REFRESH);
      return response.status === 200;
    } catch (error) {
      return false;
    }
  }

  // Forgot password
  async forgotPassword(email) {
    try {
      const response = await apiMethods.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, { email });
      return handleApiResponse(response, 'Password reset email sent successfully');
    } catch (error) {
      return handleApiError(error, 'Failed to send password reset email.');
    }
  }

  // Reset password
  async resetPassword(resetData) {
    try {
      const response = await apiMethods.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, resetData);
      return handleApiResponse(response, SUCCESS_MESSAGES.PASSWORD_RESET_SUCCESS);
    } catch (error) {
      return handleApiError(error, 'Password reset failed. Please try again.');
    }
  }

  // Refresh token
  async refreshToken() {
    try {
      const response = await apiMethods.post(API_ENDPOINTS.AUTH.REFRESH);
      
      if (response.token) {
        localStorage.setItem(AUTH_CONFIG.TOKEN_KEY, response.token);
      }

      return handleApiResponse(response, 'Token refreshed successfully');
    } catch (error) {
      return handleApiError(error, 'Token refresh failed.');
    }
  }
}

const authServiceInstance = new AuthService();
export default authServiceInstance;
