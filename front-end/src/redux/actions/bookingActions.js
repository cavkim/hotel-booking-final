// Booking Redux Actions
export const SET_BOOKING_DATA = 'SET_BOOKING_DATA';
export const UPDATE_BOOKING_STEP = 'UPDATE_BOOKING_STEP';
export const RESET_BOOKING = 'RESET_BOOKING';
export const SUBMIT_BOOKING = 'SUBMIT_BOOKING';
export const UPDATE_TOTAL_PRICE = 'UPDATE_TOTAL_PRICE';

export const setBookingData = (data) => ({
  type: SET_BOOKING_DATA,
  payload: data
});

export const updateBookingStep = (step) => ({
  type: UPDATE_BOOKING_STEP,
  payload: step
});

export const resetBooking = () => ({
  type: RESET_BOOKING
});

export const submitBooking = (bookingData) => ({
  type: SUBMIT_BOOKING,
  payload: bookingData
});

export const updateTotalPrice = (totalPrice) => ({
  type: UPDATE_TOTAL_PRICE,
  payload: totalPrice
});
