import { configureStore } from '@reduxjs/toolkit';
import bookingReducer from './reducers/bookingReducer';
import authReducer from './reducers/authReducer';

const store = configureStore({
  reducer: {
    booking: bookingReducer,
    auth: authReducer
  }
});

export default store;
