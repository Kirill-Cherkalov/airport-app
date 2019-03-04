export function airportHaveErrored(bool) {
  return {
    type: 'AIRPORTS_HAVE_ERRORED',
    haveErrored: bool
  };
};

export function airportsFetchDataSuccess(airports) {
  return {
    type: 'AIRPORTS_FETCH_DATA_SUCCESS',
    airports
  }
}

export function airportsFetchData(url) {
  return (dispatch) => {
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }

        return response;
      })
      .then(response => response.json())
      .then(airports => dispatch(airportsFetchDataSuccess(airports)))
      .catch(() => dispatch(airportHaveErrored(true)));
  }
}