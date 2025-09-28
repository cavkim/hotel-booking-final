// Redux actions for authentication
import axios from "axios";
import apiClient from "../../config/apiClient";

export const AUTH_ACTIONS = {
  SIGN_IN_REQUEST: 'SIGN_IN_REQUEST',
  SIGN_IN_SUCCESS: 'SIGN_IN_SUCCESS',
  SIGN_IN_FAILURE: 'SIGN_IN_FAILURE',
  SIGN_UP_REQUEST: 'SIGN_UP_REQUEST',
  SIGN_UP_SUCCESS: 'SIGN_UP_SUCCESS',
  SIGN_UP_FAILURE: 'SIGN_UP_FAILURE',
  SIGN_OUT: 'SIGN_OUT',
  LOAD_USER: 'LOAD_USER',
  CLEAR_ERROR: 'CLEAR_ERROR',
  UPDATE_PROFILE_REQUEST: 'UPDATE_PROFILE_REQUEST',
  UPDATE_PROFILE_SUCCESS: 'UPDATE_PROFILE_SUCCESS',
  UPDATE_PROFILE_FAILURE: 'UPDATE_PROFILE_FAILURE',
  SHOW_LOGIN_MODAL: 'SHOW_LOGIN_MODAL',
  HIDE_LOGIN_MODAL: 'HIDE_LOGIN_MODAL'
};

// Sign in action creators
export const signInRequest = () => ({
  type: AUTH_ACTIONS.SIGN_IN_REQUEST
});

export const signInSuccess = (user, token) => ({
  type: AUTH_ACTIONS.SIGN_IN_SUCCESS,
  payload: { user, token }
});

export const signInFailure = (error) => ({
  type: AUTH_ACTIONS.SIGN_IN_FAILURE,
  payload: error
});

// Sign up action creators
export const signUpRequest = () => ({
  type: AUTH_ACTIONS.SIGN_UP_REQUEST
});

export const signUpSuccess = (user, token) => ({
  type: AUTH_ACTIONS.SIGN_UP_SUCCESS,
  payload: { user, token }
});

export const signUpFailure = (error) => ({
  type: AUTH_ACTIONS.SIGN_UP_FAILURE,
  payload: error
});

// Sign out action creator
export const signOut = () => ({
  type: AUTH_ACTIONS.SIGN_OUT
});

// Load user action creator
export const loadUser = (user, token) => ({
  type: AUTH_ACTIONS.LOAD_USER,
  payload: { user, token }
});

// Clear error action creator
export const clearError = () => ({
  type: AUTH_ACTIONS.CLEAR_ERROR
});

// Update profile action creators
export const updateProfileRequest = () => ({
  type: AUTH_ACTIONS.UPDATE_PROFILE_REQUEST
});

export const updateProfileSuccess = (user) => ({
  type: AUTH_ACTIONS.UPDATE_PROFILE_SUCCESS,
  payload: user
});

export const updateProfileFailure = (error) => ({
  type: AUTH_ACTIONS.UPDATE_PROFILE_FAILURE,
  payload: error
});

// Async action creators
export const signIn = (credentials) => async (dispatch) => {
  try {
    // Dispatch a "loading" action if you have one
    // dispatch(signInRequest());

    const res = await axios.post('https://api.bakongcity.city/api/v1/auth/login', credentials);

    // Dispatch a success action with user + token
    dispatch(signInSuccess(res.data.user, res.data.token));

    // Optionally load user profile
    dispatch(loadUser());

    return res.data;
  } catch (error) {
    // Dispatch failure
    dispatch(signInFailure(error.response?.data?.message || error.message));
    throw error;
  }
};

export const signUp = (userData) => async (dispatch) => {
  try {
    dispatch(signUpRequest());
    
    const authService = (await import('../../services/authService')).default;
    const response = await authService.register(userData);
    
    dispatch(signUpSuccess(response.user, response.token));
    return response;
  } catch (error) {
    // If API fails, try mock service for development
    if (error.message.includes('Server is not responding') || error.message.includes('backend API')) {
      try {
        console.warn('Using mock authentication service for development');
        const mockAuthService = (await import('../../services/mockAuthService')).default;
        const response = await mockAuthService.register(userData);
        
        dispatch(signUpSuccess(response.user, response.token));
        return response;
      } catch (mockError) {
        dispatch(signUpFailure('Authentication service unavailable. Please try again later.'));
        throw mockError;
      }
    }
    
    dispatch(signUpFailure(error.message));
    throw error;
  }
};

export const signOutUser = () => async (dispatch) => {
  const authService = (await import('../../services/authService')).default;
  authService.signOut();
  dispatch(signOut());
};

export const loadUserFromStorage = () => async (dispatch) => {
  const authService = (await import('../../services/authService')).default;
  const user = authService.getCurrentUser();
  const token = authService.getToken();
  
  if (user && token) {
    dispatch(loadUser(user, token));
  }
};

export const updateProfile = (profileData) => async (dispatch) => {
  try {
    dispatch(updateProfileRequest());
    
    const authService = (await import('../../services/authService')).default;
    const response = await authService.updateProfile(profileData);
    
    dispatch(updateProfileSuccess(response.user));
    return response;
  } catch (error) {
    // If API fails, try mock service for development
    if (error.message.includes('Server is not responding') || error.message.includes('backend API')) {
      try {
        console.warn('Using mock authentication service for development');
        const mockAuthService = (await import('../../services/mockAuthService')).default;
        const response = await mockAuthService.updateProfile(profileData);
        
        dispatch(updateProfileSuccess(response.user));
        return response;
      } catch (mockError) {
        dispatch(updateProfileFailure('Profile update service unavailable. Please try again later.'));
        throw mockError;
      }
    }
    
    dispatch(updateProfileFailure(error.message));
    throw error;
  }
};

// Login modal action creators
export const showLoginModal = (modalData = {}) => ({
  type: AUTH_ACTIONS.SHOW_LOGIN_MODAL,
  payload: modalData
});

export const hideLoginModal = () => ({
  type: AUTH_ACTIONS.HIDE_LOGIN_MODAL
});
