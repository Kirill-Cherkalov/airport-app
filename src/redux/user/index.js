import { combineReducers } from 'redux';
import { request, selectedFlight, totalPrice } from './reducers';

export default combineReducers({
  request,
  selectedFlight,
  totalPrice,
});
