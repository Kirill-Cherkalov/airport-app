import axios from 'axios';
import actionTypes from './actionTypes';

export function setPaymentData(payload) {
  return {
    type: actionTypes.SET_PAYMENT_DATA,
    payload,
  };
}

export function getPaymentDataError(payload) {
  return {
    type: actionTypes.GET_PAYMENT_DATA_ERROR,
    payload,
  };
}

export function fetchPaymentData(paymentObj) {
  return (dispatch) => {
    axios.post('http://localhost:3001/pay', paymentObj)
      .then((response) => {
        if (response.status !== 200) {
          throw Error(response.statusText);
        }

        return response.data;
      })
      // .then(response => response.json())
      .then((paymentInfo) => {
        dispatch(setPaymentData(paymentInfo));
        dispatch(getPaymentDataError(false));
      })
      .catch(() => dispatch(getPaymentDataError(true)));
  };
}

function getPaymentSuccess(payload) {
  return {
    type: actionTypes.GET_PAYMENT_SUCCESS,
    payload,
  };
}

export function fetchPaymentSuccessData(data) {
  return (dispatch) => {
    axios.get('http://localhost:3001/success' + data)
      .then(response => dispatch(getPaymentSuccess(response.data)))
      .catch();
  };
}
