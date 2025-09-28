// Booking Redux Reducer
import {
  SET_BOOKING_DATA,
  UPDATE_BOOKING_STEP,
  RESET_BOOKING,
  SUBMIT_BOOKING,
  UPDATE_TOTAL_PRICE
} from '../actions/bookingActions';

const initialState = {
  currentStep: 1,
  bookingData: {
    checkIn: '',
    checkOut: '',
    guests: 1,
    rooms: 1,
    guestDetails: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      specialRequests: ''
    },
    paymentMethod: 'credit',
    addOns: {
      boatTransfer: false,
      biking: false,
      kayak: false,
      snorkeling: false
    },
    cardDetails: {
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      cardholderName: ''
    }
  },
  roomData: null,
  isSubmitting: false,
  bookingId: null,
  error: null,
  totalPrice: 0
};

const bookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BOOKING_DATA:
      return {
        ...state,
        bookingData: {
          ...state.bookingData,
          ...action.payload
        }
      };

    case UPDATE_BOOKING_STEP:
      return {
        ...state,
        currentStep: action.payload
      };

    case RESET_BOOKING:
      return initialState;

    case SUBMIT_BOOKING:
      return {
        ...state,
        isSubmitting: true,
        error: null
      };

    case 'BOOKING_SUCCESS':
      return {
        ...state,
        isSubmitting: false,
        bookingId: action.payload.bookingId,
        currentStep: 4
      };

    case 'BOOKING_ERROR':
      return {
        ...state,
        isSubmitting: false,
        error: action.payload
      };

    case 'SET_ROOM_DATA':
      return {
        ...state,
        roomData: action.payload
      };

    case UPDATE_TOTAL_PRICE:
      return {
        ...state,
        totalPrice: action.payload
      };

    default:
      return state;
  }
};

export default bookingReducer;
