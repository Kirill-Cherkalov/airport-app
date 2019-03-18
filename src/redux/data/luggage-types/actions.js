import actionTypes from '../actionTypes';

function getLuggageTypes(luggageTypes) {
  return {
    type: actionTypes.GET_LUGGAGE_TYPES,
    luggageTypes,
  };
}

function hasErrored(bool) {
  return {
    type: actionTypes.LUGGAGE_HAS_ERRORED,
    bool,
  };
}

export default function fetchLuggageTypes() {
  return (dispatch) => {
    fetch('http://localhost:3001/luggage-types')
      .then((response) => {
        if (!response.ok) {
          throw Error('Info is not found');
        }

        return response;
      })
      .then(response => response.json())
      .then(luggageTypes => dispatch(getLuggageTypes(luggageTypes)))
      .catch(() => dispatch(hasErrored(true)));
  };
}
