import { combineReducers } from 'redux';
import { items, hasErrored } from './reducers';

export default combineReducers({
  items,
  hasErrored
});