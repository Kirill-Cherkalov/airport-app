import actionTypes from './actionTypes';

const initialState = {
  request: {},
  selectedFlight: {},
  totalPrice: 0,
  passengersInfo: [],
  selectedPassenger: 0,
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case actionTypes.USER_REQUEST:
      return {
        ...state,
        request: action.request,
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
    default:
      return state;
  }
}
