import { combineReducers } from 'redux';
import selectedFlight from './selectedFlight/reducers';
import returnSelectedFlight from './returnSelectedFlight/reducers';
import requestInfo from './reducers';

export default combineReducers({
  selectedFlight,
  returnSelectedFlight,
  requestInfo,
});
