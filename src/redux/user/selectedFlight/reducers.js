import actionTypes from '../actionTypes';

const initialState = {
  id: '',
  passengersInfo: [],
  selectedPassenger: 0,
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case actionTypes.USER_SELECTED_FLIGHT_INFO:
      return {
        ...state,
        ...action.flightInfo,
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
