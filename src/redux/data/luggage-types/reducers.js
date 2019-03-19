import actionTypes from '../actionTypes';

const initialState = {
  luggageTypes: [],
  hasErrored: false,
};

export default function luggageTypes(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_LUGGAGE_TYPES:
      return {
        ...state,
        luggageTypes: action.luggageTypes,
      };
    case actionTypes.LUGGAGE_HAS_ERRORED:
      return {
        ...state,
        hasErrored: action.hasErrored,
      };
    default:
      return state;
  }
}
