import axios from 'axios';
import actionTypes from './actionTypes';
import urls from '../../urls';

export function setUserRequestData(request) {
  return {
    type: actionTypes.USER_REQUEST,
    request,
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

export function setPassengersInfo(info) {
  return {
    type: actionTypes.PASSENGERS_INFO,
    info,
  };
}

export function selectPassenger(id) {
  return {
    type: actionTypes.SELECTED_PASSENGER,
    id,
  };
}

function logInUser(bool) {
  return {
    type: actionTypes.IS_LOGGED_IN_USER,
    bool,
  };
}

export function registerUser() {
  return {
    type: actionTypes.IS_REGISTERED_USER,
  };
}

export function authoriseUser(userInfo) {
  const url = userInfo.firstName ? urls.sendRegisterFormData : urls.sendLoginFormData;

  return (dispatch) => {
    axios.post(url, userInfo)
      .then((response) => {
        dispatch(logInUser(true));
        localStorage.setItem('id', response.data.id);
        localStorage.setItem('token', response.data.token);
      })
      .catch(err => localStorage.setItem('error', JSON.stringify(err)));
  };
}
