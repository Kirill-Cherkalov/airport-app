export function airportsHaveErrored(state = false, action) {
  switch (action.type) {
    case 'AIRPORTS_HAVE_ERRORED':
      return action.haveErrored;
    default:
      return state;
  }
}

export function airports(state = [], action) {
  switch (action.type) {
    case 'AIRPORTS_FETCH_DATA_SUCCESS':
      return action.airports;
    default:
      return state;
  }
}