import actionTypes from '../actionTypes';

function getPlaneSchema(schema) {
  return {
    type: actionTypes.GET_PLANE_SCHEMA,
    schema,
  };
}

function hasErrored(bool) {
  return {
    type: actionTypes.PLANE_SCHEMA_HAS_ERRORED,
    bool,
  };
}

export default function fetchPlaneSchema(planeId) {
  return (dispatch) => {
    fetch('http://localhost:3001/plane-schema')
      .then((response) => {
        if (!response.ok) {
          throw Error('Info is not found');
        }

        return response;
      })
      .then(response => response.json())
      .then(schemas => dispatch(getPlaneSchema(schemas[planeId])))
      .then(() => dispatch(hasErrored(true)));
  };
}
