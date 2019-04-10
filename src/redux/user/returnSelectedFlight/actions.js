import axios from 'axios';
import actionTypes from '../actionTypes';

export function setReturnFlightInfo(flightInfo) {
  return {
    type: actionTypes.USER_RETURN_SELECTED_FLIGHT_INFO,
    flightInfo,
  };
}

export function setReturnSelectedFlightInfo(flightInfo) {
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
        dispatch(setReturnFlightInfo(updatedFlightInfo));
      })
      .catch(err => console.log(err));
  };
}


export function setReturnFlightPassengersInfo(info) {
  return {
    type: actionTypes.RETURN_FLIGHT_PASSENGERS_INFO,
    info,
  };
}

export function setReturnFlightSelectedPassenger(id) {
  return {
    type: actionTypes.RETURN_FLIGHT_SELECTED_PASSENGER,
    id,
  };
}

export function resetReturnSelectedFlightInfo() {
  return {
    type: actionTypes.RETURN_SELECTED_FLIGHT_INFO_RESETTING,
  };
}
