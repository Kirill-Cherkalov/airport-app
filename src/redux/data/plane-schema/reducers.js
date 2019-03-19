import actionTypes from '../actionTypes';

const initialState = {
  planeSchema: {},
  hasErrored: false,
};

export default function plane(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_PLANE_SCHEMA:
      return {
        ...state,
        schema: action.schema,
      };
    case actionTypes.PLANE_SCHEMA_HAS_ERRORED:
      return {
        ...state,
        hasErrored: action.hasErrored,
      };
    default:
      return state;
  }
}
