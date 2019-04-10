import actionTypes from '../actionTypes';

const initialState = {
  id: '',
  passengersInfo: [],
  selectedPassenger: 0,
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case actionTypes.USER_RETURN_SELECTED_FLIGHT_INFO:
      return {
        ...state,
        ...action.flightInfo,
      };
    case actionTypes.RETURN_FLIGHT_PASSENGERS_INFO:
      return {
        ...state,
        passengersInfo: action.info,
      };
    case actionTypes.RETURN_FLIGHT_SELECTED_PASSENGER:
      return {
        ...state,
        selectedPassenger: action.id,
      };
    case actionTypes.RETURN_SELECTED_FLIGHT_INFO_RESETTING:
      return {
        ...initialState,
      };
    default:
      return state;
  }
}
