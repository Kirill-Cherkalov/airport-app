import actionTypes from '../actionTypes';

export function userRequestData(data) {
  return {
    type: actionTypes.USER_REQUEST,
    data
  }
}

