import axios from 'axios';
import actionTypes from './actionTypes';
import { enqueueSnackbar } from '../notifier/actions';
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

export function payForOrders(userOrder) {
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

export function logInUser(bool) {
  return {
    type: actionTypes.IS_LOGGED_IN_USER,
    bool,
  };
}

function loginUserInSystem(bool, id, token) {
  return (dispatch) => {
    dispatch(logInUser(bool));
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
  };
}

export function authoriseUser(userInfo) {
  const url = userInfo.firstName ? urls.sendRegisterFormData : urls.sendLoginFormData;

  return (dispatch) => {
    axios.post(url, userInfo)
      .then((response) => {
        dispatch(loginUserInSystem(true, response.data.id, response.data.token));

        if (!userInfo.firstName) {
          return dispatch(enqueueSnackbar({
            message: 'Authorization success',
            options: {
              variant: 'success',
            },
          }));
        }

        return dispatch(enqueueSnackbar({
          message: 'Registration success',
          options: {
            variant: 'success',
          },
        }));
      })
      .catch(() => dispatch(logInUser(false)));
  };
}

export function resetUserInfo() {
  return {
    type: actionTypes.USER_INFO_RESETTING,
  };
}
