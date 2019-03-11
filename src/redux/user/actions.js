import actionTypes from './actionTypes';

export function setUserRequestData(data) {
  return {
    type: actionTypes.USER_REQUEST,
    data,
  };
}

export function setSelectedFlightInfo(flightInfo) {
  return {
    type: actionTypes.USER_SELECTED_FLIGHT_INFO,
    flightInfo,
  };
}

export function setTotalPrice(price) {
  return {
    type: actionTypes.USER_TOTAL_PRICE,
    price,
  };
}
