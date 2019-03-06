import { combineReducers } from 'redux';
import { items, hasErrored, isLoading } from './reducers';

export default combineReducers({
  items,
  hasErrored,
  isLoading
});