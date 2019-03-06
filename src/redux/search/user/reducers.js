import actionTypes from '../actionTypes';

export function request(state = {}, action) {
  switch (action.type) {
    case actionTypes.USER_REQUEST:
      return action.data;
    default: 
      return state;
  }
}