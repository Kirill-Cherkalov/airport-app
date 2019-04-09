import { combineReducers } from 'redux';
import selectedFlight from './selectedFlight/reducers';
import returnSelectedFlight from './returnSelectedFlight/reducers';
import requestInfo from './reducers';
import ordersInfo from './orders/reducers';

export default combineReducers({
  selectedFlight,
  returnSelectedFlight,
  requestInfo,
  ordersInfo,
});
