import { combineReducers } from 'redux';
import luggage from './luggage-types/reducers';
import plane from './plane-schema/reducers';

export default combineReducers({
  luggage,
  plane,
});
