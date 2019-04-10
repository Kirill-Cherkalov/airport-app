import axios from 'axios';
import actionTypes from './actionTypes';

export function getUserOrders(orders) {
  return {
    type: actionTypes.FETCHED_USER_ORDERS,
    orders,
  };
}

export function getUserOrdersErrored(bool) {
  return {
    type: actionTypes.FETCHED_USER_ORDERS_ERRORED,
    bool,
  };
}

export function fetchUserOrdersData(date, type) {
  const userId = localStorage.getItem('id');

  return (dispatch) => {
    axios.get(`http://localhost:3001/order?userId=${userId}&date=${date}&type=${type}`)
      .then((response) => {
        if (response.status !== 200) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then((response) => {
        dispatch(getUserOrders(response.data));
        dispatch(getUserOrdersErrored(false));
      })
      .catch(() => dispatch(getUserOrdersErrored(true)));
  };
}

export function resetOrdersInfo() {
  return {
    type: actionTypes.ORDERS_INFO_RESETTING,
  };
}
