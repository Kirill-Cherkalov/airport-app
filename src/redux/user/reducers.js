import actionTypes from './actionTypes';

const initialState = {
  request: {},
  selectedFlight: {
    id: '',
  },
  returnSelectedFlight: {
    id: '',
  },
  totalPrice: 0,
  passengersInfo: [],
  selectedPassenger: 0,
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
    case actionTypes.USER_RETURN_SELECTED_FLIGHT_INFO:
      return {
        ...state,
        returnSelectedFlight: action.flightInfo,
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
