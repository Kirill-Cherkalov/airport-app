import actionTypes from '../actionTypes';

const initialState = {
  hasErrored: false,
  isLoading: false,
  departureItems: [],
  returnItems: [],
};

export default function tickets(state = initialState, action) {
  switch (action.type) {
    case actionTypes.TICKETS_HAS_ERRORED:
      return {
        ...state,
        hasErrored: action.hasErrored,
      };
    case actionTypes.TICKETS_IS_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case actionTypes.TICKETS_FETCH_DATA_SUCCESS:
      return {
        ...state,
        departureItems: action.items,
      };
    case actionTypes.TICKETS_RETURN_FETCH_DATA_SUCCESS:
      return {
        ...state,
        returnItems: action.items,
      };
    case actionTypes.TICKETS_INFO_RESETTING:
      return {
        ...initialState,
      };
    default:
      return state;
  }
}
