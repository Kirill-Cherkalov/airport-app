import axios from 'axios';
import actionTypes from './actionTypes';
import urls from '../../urls';

export function setUserRequestData(request) {
  return {
    type: actionTypes.USER_REQUEST,
    request,
  };
}

function paymentStatus(bool) {
  return {
    type: actionTypes.PAYMENT_STATUS,
    bool,
  };
}

export function payForOrder(userOrder) {
  return dispatch => userOrder.forEach(order => axios.post('http://localhost:3001/order', order)
    .then((response) => {
      if (response.status !== 200) {
        paymentStatus(false);
        throw Error(response.statusText);
      }

      return response.data;
    })
    .then(() => dispatch(paymentStatus(true)))
    .catch(err => console.log(err)));
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
