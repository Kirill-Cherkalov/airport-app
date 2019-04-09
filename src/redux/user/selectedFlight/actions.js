import axios from 'axios';
import actionTypes from '../actionTypes';

export function setFlightInfo(flightInfo) {
  return {
    type: actionTypes.USER_SELECTED_FLIGHT_INFO,
    flightInfo,
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


export function setPassengersInfo(info) {
  return {
    type: actionTypes.PASSENGERS_INFO,
    info,
  };
}

export function setSelectedPassenger(id) {
  return {
    type: actionTypes.SELECTED_PASSENGER,
    id,
  };
}
