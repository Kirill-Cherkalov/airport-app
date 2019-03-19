import actionTypes from '../actionTypes';

export function hasErrored(bool) {
  return {
    type: actionTypes.AIRPORT_HAS_ERRORED,
    hasErrored: bool,
  };
}

export function fetchDataSuccess(items) {
  return {
    type: actionTypes.AIRPORT_FETCH_DATA_SUCCESS,
    items,
  };
}

export function airportsFetchData(url) {
  return (dispatch) => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }

        return response;
      })
      .then(response => response.json())
      .then(airports => dispatch(fetchDataSuccess(airports)))
      .catch(() => dispatch(hasErrored(true)));
  };
}
