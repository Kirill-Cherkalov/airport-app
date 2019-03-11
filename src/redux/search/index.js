import { combineReducers } from 'redux';
import tickets from './tickets';
import airports from './airports';

export default combineReducers({
  tickets,
  airports,
});
