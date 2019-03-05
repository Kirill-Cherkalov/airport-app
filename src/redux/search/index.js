import { combineReducers } from 'redux';
import { tickets, ticketsHasErrored, ticketsIsLoading } from './tickets/reducers';
import { airports, airportsHaveErrored } from './airports/reducers';
import { userRequest } from './user/reducers';

export default combineReducers({
  tickets,
  ticketsHasErrored,
  ticketsIsLoading,
  airports,
  airportsHaveErrored,
  userRequest
});

