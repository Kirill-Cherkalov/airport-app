import { combineReducers } from 'redux';
import { tickets, ticketsHasErrored, ticketsIsLoading } from './tickets';
import { airports, airportsHaveErrored } from './airports';

export default combineReducers({
  tickets,
  ticketsHasErrored,
  ticketsIsLoading,
  airports,
  airportsHaveErrored
});

