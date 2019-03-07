import axios from '../../../data';
import actionTypes from '../actionTypes';
import userRequestData from '../user/actions';

export function hasErrored(bool) {
  return {
    type: actionTypes.TICKETS_HAS_ERRORED,
    hasErrored: bool,
  };
}

export function isLoading(bool) {
  return {
    type: actionTypes.TICKETS_IS_LOADING,
    isLoading: bool,
  };
}

export function fetchDataSuccess(items) {
  return {
    type: actionTypes.TICKETS_FETCH_DATA_SUCCESS,
    items,
  };
}

export function ticketsFetchData(url, userRequest) {
  return (dispatch) => {
    dispatch(isLoading(true));
    dispatch(userRequestData(userRequest));

    axios.post(url)
      .then((response) => {
        if (!response.data.tickets.length) {
          throw Error(response.statusText);
        }

        dispatch(isLoading(false));

        return response;
      })
      // .then(response => response.json())
      .then(response => response.data.tickets)
      .then(tickets => dispatch(fetchDataSuccess(tickets)))
      .catch(() => {
        dispatch(hasErrored(true));
      });
  };
}


// export function ticketsFetchData(url) {
//   return (dispatch) => {
//     dispatch(ticketsIsLoading(true));

//     fetch(url)
//       .then(response => {
//         if(!response.ok) {
//           throw Error(response.statusText);
//         }

//         dispatch(ticketsIsLoading(false));

//         return response;
//       })
//       .then(response => response.json())
//       .then(tickets => dispatch(ticketsFetchDataSuccess(tickets)))
//       .catch(() => dispatch(ticketsHasErrored(true)));
//   };
// }
