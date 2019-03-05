import axios from '../../../data';

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
    axios.get(url)
      .then(response => {
        if (!response.data.airports.length) {
          console.log(response);
          throw Error(response.statusText);
        }

        return response;
      })
      // .then(response => response.json())
      .then(response => {
        return response.data.airports;
      })
      .then(airports => dispatch(airportsFetchDataSuccess(airports)))
      .catch(() => dispatch(airportHaveErrored(true)));
  }
}
