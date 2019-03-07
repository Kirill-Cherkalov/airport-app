import actionTypes from '../actionTypes';

export default function userRequestData(data) {
  return {
    type: actionTypes.USER_REQUEST,
    data,
  };
}
