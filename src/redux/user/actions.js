import axios from '../../data';
import actionTypes from './actionTypes';

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

export function getPlaneLayout(layout) {
  return {
    type: actionTypes.PLANE_LAYOUT,
    layout,
  };
}

export function fetchPlaneLayout(id) {
  return (dispatch) => {
    axios.get('/planes')
      .then((response) => {
        if (!response.data) {
          throw Error(response.statusText);
        }
        return response;
      })
      // .then(response => response.json())
      .then(response => response.data[id])
      .then(planeLayout => dispatch(getPlaneLayout(planeLayout)))
      .catch(error => console.log(error));
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

// export function selectSeat(seat) {
//   return {
//     type: actionTypes.SELECTED_SEAT,
//     seat,
//   };
// }
