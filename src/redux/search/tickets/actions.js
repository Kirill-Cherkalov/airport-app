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
  const wayType = userRequest.wayType || [];
  const departureUrl = `http://localhost:3001/tickets?fromCountry=${from}&toCountry=${to}`;
  const backUrl = wayType.length ? `http://localhost:3001/tickets?fromCountry=${to}&toCountry=${from}` : null;
  const urls = [
    {
      url: departureUrl,
      action: fetchDataSuccess,
      name: 'departureItems',
      date: departure,
    },
    {
      url: backUrl,
      action: fetchReturnDataSuccess,
      name: 'returnItems',
      date: back,
    },
  ];

  return (dispatch) => {
    dispatch(fetchDataSuccess([]));
    dispatch(fetchReturnDataSuccess([]));
    dispatch(isLoading(true));

    urls.forEach(({ url, action, name, date }) => {
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
            const requestDate = new Date(date);
            const result = tickets.map((ticket) => {
              const {
                _id, code, price, planeInfo, fromCountry: { name: fromCountry }, toCountry: { name: toCountry },
              } = ticket;

              const twoWayRequest = !!(wayType.length);
              const editedUserRequest = {
                ...userRequest,
                twoWayRequest,
                from: backUrl ? toCountry : fromCountry,
                to: backUrl ? fromCountry : toCountry,
              };
              dispatch(setUserRequestData(editedUserRequest));
              const startDate = new Date(ticket.flightPeriod.startDate);
              const endDate = new Date(ticket.flightPeriod.endDate);
              if (startDate <= requestDate && requestDate <= endDate) {
                const reqDay = requestDate.getDay();

                if (ticket.schedule.some(({ day }) => day === reqDay)) {
                  const flightSch = ticket.schedule.filter(({ day }) => day === reqDay);

                  return {
                    id: _id,
                    code,
                    date: requestDate,
                    startTime: flightSch[0].departureTime,
                    endTime: flightSch[0].arrivalTime,
                    fromCountry,
                    toCountry,
                    price,
                    planeInfo,
                  };
                }
              }
            });

            localStorage.setItem(`${name}`, JSON.stringify(result));

            if (result[0] === undefined) {
              dispatch(enqueueSnackbar({
                message: "Can't find flights for this request",
                options: {
                  variant: 'error',
                },
              }));
            } else {
              return dispatch(action(result));
            }
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
