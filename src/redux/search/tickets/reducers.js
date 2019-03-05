export function ticketsHasErrored(state = false, action) {
  switch (action.type) {
    case 'TICKETS_HAS_ERRORED':
      return action.hasErrored;
    default: 
      return state;
  }
}

export function ticketsIsLoading(state = false, action) {
  switch (action.type) {
    case 'TICKETS_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}

export function tickets(state = [], action) {
  switch (action.type) {
    case 'TICKETS_FETCH_DATA_SUCCESS':
      return action.tickets;
    default:
      return state;
  }
}
