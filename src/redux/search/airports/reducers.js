import actionTypes from '../actionTypes';

export function hasErrored(state = false, action) {
  switch (action.type) {
    case actionTypes.AIRPORT_HAS_ERRORED:
      return action.hasErrored;
    default:
      return state;
  }
}

export function items(state = [], action) {
  switch (action.type) {
    case actionTypes.AIRPORT_FETCH_DATA_SUCCESS:
      return action.items;
    default:
      return state;
  }
}