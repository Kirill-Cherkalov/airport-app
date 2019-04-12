import actionTypes from '../actionTypes';
// import { setUserRequestData, setRequestType } from '../../user/actions';
import { setUserRequestData } from '../../user/actions';
import { enqueueSnackbar } from '../../notifier/actions';

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
    dispatch(fetchDataSuccess([]));
    dispatch(fetchReturnDataSuccess([]));
    dispatch(isLoading(true));

    urls.forEach(({ url, action }) => {
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
                _id, date, startTime, endTime, price, planeInfo, fromCountry: { name: fromCountry }, toCountry: { name: toCountry },
              } = ticket;

              const twoWayRequest = !!(userRequest.departure && userRequest.return);
              const editedUserRequest = {
                ...userRequest,
                twoWayRequest,
                from: backUrl ? toCountry : fromCountry,
                to: backUrl ? fromCountry : toCountry,
              };
              dispatch(setUserRequestData(editedUserRequest));

              return {
                id: _id,
                date,
                startTime,
                endTime,
                fromCountry,
                toCountry,
                price,
                planeInfo,
              };
            });

            if (!result.length) {
              dispatch(enqueueSnackbar({
                message: "Can't find flights for this request",
                options: {
                  variant: 'error',
                },
              }));
            }

            return dispatch(action(result));
          })
          .catch(() => {
            dispatch(hasErrored(true));
            dispatch(enqueueSnackbar({
              message: 'Ooops...Something goes wrong',
              options: {
                variant: 'error',
              },
            }));
          });
      }
    });
  };
}

export function resetTicketsInfo() {
  return {
    type: actionTypes.TICKETS_INFO_RESETTING,
  };
}
