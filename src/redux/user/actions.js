import axios from 'axios';
import actionTypes from './actionTypes';
import urls from '../../urls';

export function setUserRequestData(request) {
  return {
    type: actionTypes.USER_REQUEST,
    request,
  };
}

function setFlightInfo(flightInfo) {
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

function paymentStatus(bool) {
  return {
    type: actionTypes.PAYMENT_STATUS,
    bool,
  };
}

export function payForOrder(userOrder) {
  return (dispatch) => {
    axios.post('http://localhost:3001/order', userOrder)
      .then((response) => {
        if (response.status !== 200) {
          paymentStatus(false);
          throw Error(response.statusText);
        }

        return response.data;
      })
      .then(() => dispatch(paymentStatus(true)))
      .catch(err => console.log(err));
  };
}

export function setSelectedFlightInfo(flightInfo) {
  const url = `http://localhost:3001/order?selectedFlight=${flightInfo.id}`;

  return (dispatch) => {
    axios.get(url)
      .then((response) => {
        if (response.status !== 200) {
          throw Error(response.statusText);
        }

        return response.data;
      })
      .then(orders => orders.map(({ passengersInfo }) => passengersInfo))
      .then((passengersInfo) => {
        const seats = [];
        passengersInfo.map(passenger => passenger.forEach(({ selectedSeat }) => {
          seats.push(selectedSeat);
        }));
        return seats;
      })
      .then((soldSeats) => {
        const updatedFlightInfo = {
          ...flightInfo,
          soldSeats,
        };
        dispatch(setFlightInfo(updatedFlightInfo));
      })
      .catch(err => console.log(err));
  };
}

function logInUser(bool) {
  return {
    type: actionTypes.IS_LOGGED_IN_USER,
    bool,
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
