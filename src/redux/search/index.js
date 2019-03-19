import { combineReducers } from 'redux';
import tickets from './tickets/reducers';
import airports from './airports/reducers';

export default combineReducers({
  tickets,
  airports,
});
