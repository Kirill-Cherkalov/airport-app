import actionTypes from './actionTypes';

export function request(state = {}, action) {
  switch (action.type) {
    case actionTypes.USER_REQUEST:
      return action.data;
    default:
      return state;
  }
}

export function selectedFlight(state = {}, action) {
  switch (action.type) {
    case actionTypes.USER_SELECTED_FLIGHT_INFO:
      return action.flightInfo;
    default:
      return state;
  }
}

export function totalPrice(state = 0, action) {
  switch (action.type) {
    case actionTypes.USER_TOTAL_PRICE:
      return state.totalPrice ? +state.totalPrice + +action.price : +action.price;
    default:
      return state;
  }
}

export function passengersInfo(state = {}, action) {
  switch (action.type) {
    case actionTypes.PASSENGERS_INFO:
      return action.info;
    default:
      return state;
  }
}
