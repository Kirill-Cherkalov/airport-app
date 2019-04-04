import actionTypes from './actionTypes';

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

export function setSelectedFlightInfo(flightInfo) {
  const url = `http://localhost:3001/order?selectedFlight=${flightInfo.id}`;

  return (dispatch) => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }

        return response.json();
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
        dispatch(setFlightInfo(updatedFlightInfo));
      })
      .catch(err => console.log(err));
  };
}
