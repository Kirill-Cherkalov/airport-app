import actionTypes from '../actionTypes';
import { setUserRequestData } from '../../user/actions';

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

export function fetchReturnDataSuccess(items) {
  return {
    type: actionTypes.TICKETS_RETURN_FETCH_DATA_SUCCESS,
    items,
  };
}

export function ticketsFetchData(userRequest) {
  const {
    from, to, departure, return: back,
  } = userRequest;
  const departureUrl = `http://localhost:3001/tickets?fromCountry=${from}&toCountry=${to}&date=${departure}`;
  const backUrl = back ? `http://localhost:3001/tickets?fromCountry=${to}&toCountry=${from}&date=${back}` : null;
  const urls = [
    {
      url: departureUrl,
      action: fetchDataSuccess,
    },
    {
      url: backUrl,
      action: fetchReturnDataSuccess,
    },
  ];

  return (dispatch) => {
    dispatch(isLoading(true));

    urls.map(({ url, action }) => {
      if (url) {
        fetch(url)
          .then((response) => {
            if (!response.ok) {
              throw Error(response.statusText);
            }

            dispatch(isLoading(false));

            return response;
          })
          .then(response => response.json())
          .then((tickets) => {
            const result = tickets.map((ticket) => {
              const {
                date, startTime, endTime, price, planeInfo, fromCountry: { name: fromCountry }, toCountry: { name: toCountry },
              } = ticket;
              const editedUserRequest = {
                ...userRequest,
                from: backUrl ? toCountry : fromCountry,
                to: backUrl ? fromCountry : toCountry,
              };
              dispatch(setUserRequestData(editedUserRequest));

              return {
                date,
                startTime,
                endTime,
                fromCountry,
                toCountry,
                price,
                planeInfo,
              };
            });
            dispatch(action(result));
          })
          .catch(() => dispatch(hasErrored(true)));
      }
    });
  };
}
