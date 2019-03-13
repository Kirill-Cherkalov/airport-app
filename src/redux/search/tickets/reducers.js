import actionTypes from '../actionTypes';

const initialState = {
  hasErrored: false,
  isLoading: false,
  items: [],
};

export default function tickets(state = initialState, action) {
  switch (action.type) {
    case actionTypes.TICKETS_HAS_ERRORED:
      return {
        ...state,
        hasErrores: action.hasErrored,
      };
    case actionTypes.TICKETS_IS_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case actionTypes.TICKETS_FETCH_DATA_SUCCESS:
      return {
        ...state,
        items: action.items,
      };
    default:
      return state;
  }
}
