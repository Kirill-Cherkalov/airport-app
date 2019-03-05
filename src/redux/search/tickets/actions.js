import axios from '../../../data';
import {userRequestData} from '../user/actions';

export function ticketsHasErrored(bool) {
  return {
    type: 'TICKETS_HAS_ERRORED',
    hasErrored: bool
  };
}

export function ticketsIsLoading(bool) {
  return {
    type: 'TICKETS_IS_LOADING',
    isLoading: bool
  };
}

export function ticketsFetchDataSuccess(tickets) {
  return {
    type: 'TICKETS_FETCH_DATA_SUCCESS',
    tickets
  };
}

export function ticketsFetchData(url, userRequest) {
  return async (dispatch) => {
    dispatch(ticketsIsLoading(true));
    dispatch(userRequestData(userRequest));

    axios.post(url)
      .then(response => {
        if (!response.data.tickets.length) {
          console.log(response);
          throw Error(response.statusText);
        }

        return response;
      })
      // .then(response => response.json())
      .then(response => {
        return response.data.tickets;
      })
      .then(tickets => dispatch(ticketsFetchDataSuccess(tickets)))
      .catch(() => {
        dispatch(ticketsHasErrored(true))
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