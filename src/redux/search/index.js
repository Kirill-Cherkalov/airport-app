import { combineReducers } from 'redux';
import tickets from './tickets';
import airports from './airports';
import user from './user';

export default combineReducers({
  tickets,
  airports,
  user
});
