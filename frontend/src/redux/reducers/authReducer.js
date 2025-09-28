// Redux reducer for authentication
import { AUTH_ACTIONS } from '../actions/authActions';

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  showLoginModal: false,
  loginModalData: {}
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.SIGN_IN_REQUEST:
    case AUTH_ACTIONS.SIGN_UP_REQUEST:
    case AUTH_ACTIONS.UPDATE_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };

    case AUTH_ACTIONS.SIGN_IN_SUCCESS:
    case AUTH_ACTIONS.SIGN_UP_SUCCESS:
    case AUTH_ACTIONS.LOAD_USER:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false,
        error: null
      };

    case AUTH_ACTIONS.UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null
      };

    case AUTH_ACTIONS.SIGN_IN_FAILURE:
    case AUTH_ACTIONS.SIGN_UP_FAILURE:
    case AUTH_ACTIONS.UPDATE_PROFILE_FAILURE:
      return {
        ...state,
        user: action.type === AUTH_ACTIONS.SIGN_IN_FAILURE || action.type === AUTH_ACTIONS.SIGN_UP_FAILURE ? null : state.user,
        token: action.type === AUTH_ACTIONS.SIGN_IN_FAILURE || action.type === AUTH_ACTIONS.SIGN_UP_FAILURE ? null : state.token,
        isAuthenticated: action.type === AUTH_ACTIONS.SIGN_IN_FAILURE || action.type === AUTH_ACTIONS.SIGN_UP_FAILURE ? false : state.isAuthenticated,
        loading: false,
        error: action.payload
      };

    case AUTH_ACTIONS.SIGN_OUT:
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
        error: null
      };

    case AUTH_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null
      };

    case AUTH_ACTIONS.SHOW_LOGIN_MODAL:
      return {
        ...state,
        showLoginModal: true,
        loginModalData: action.payload
      };

    case AUTH_ACTIONS.HIDE_LOGIN_MODAL:
      return {
        ...state,
        showLoginModal: false,
        loginModalData: {}
      };

    default:
      return state;
  }
};

export default authReducer;
