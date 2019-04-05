import actionTypes from './actionTypes';

const initialState = {
  request: {},
  selectedFlight: {},
  totalPrice: 0,
  passengersInfo: [],
  selectedPassenger: 0,
  loggedInUser: false,
  paymentSuccess: false,
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case actionTypes.USER_REQUEST:
      return {
        ...state,
        request: {
          ...action.request,
          adult: +action.request.adult || 0,
          child: +action.request.child || 0,
          infant: +action.request.infant || 0,
        },
      };
    case actionTypes.USER_SELECTED_FLIGHT_INFO:
      return {
        ...state,
        selectedFlight: action.flightInfo,
      };
    case actionTypes.USER_TOTAL_PRICE:
      return {
        ...state,
        totalPrice: state.totalPrice ? +state.totalPrice + +action.price : +action.price,
      };
    case actionTypes.PASSENGERS_INFO:
      return {
        ...state,
        passengersInfo: action.info,
      };
    case actionTypes.SELECTED_PASSENGER:
      return {
        ...state,
        selectedPassenger: action.id,
      };
    case actionTypes.IS_LOGGED_IN_USER:
      return {
        ...state,
        loggedInUser: action.bool,
      };
    case actionTypes.PAYMENT_STATUS:
      return {
        ...state,
        paymentSuccess: action.bool,
      };
    default:
      return state;
  }
}
