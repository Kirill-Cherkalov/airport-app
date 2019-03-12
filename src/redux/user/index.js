import { combineReducers } from 'redux';
import {
  request,
  selectedFlight,
  totalPrice,
  passengersInfo,
} from './reducers';

export default combineReducers({
  request,
  selectedFlight,
  totalPrice,
  passengersInfo,
});
