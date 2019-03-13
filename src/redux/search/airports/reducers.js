import actionTypes from '../actionTypes';

const initialState = {
  items: [],
  hasErrored: false,
};

export default function airports(state = initialState, action) {
  switch (action.type) {
    case actionTypes.AIRPORT_FETCH_DATA_SUCCESS:
      return {
        ...state,
        items: action.items,
      };
    case actionTypes.AIRPORT_HAS_ERRORED:
      return {
        ...state,
        hasErrored: action.hasErrored,
      };
    default:
      return state;
  }
}
