import actionTypes from './actionTypes';
import axios from 'axios';

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

function setReturnFlightInfo(flightInfo) {
  return {
    type: actionTypes.USER_RETURN_SELECTED_FLIGHT_INFO,
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

export function setSelectedFlightInfo(flightInfo, isReturn) {
  const url = `http://localhost:3001/order?selectedFlight=${flightInfo.id}`;
  const action = isReturn ? setReturnFlightInfo : setFlightInfo;

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
      .then((boughtSeats) => {
        const updatedFlightInfo = {
          ...flightInfo,
          boughtSeats,
        };
        dispatch(action(updatedFlightInfo));
      })
      .catch(err => console.log(err));
  };
}
