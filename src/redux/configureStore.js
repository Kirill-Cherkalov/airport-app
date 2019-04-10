import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import searchPage from './search';
import user from './user';
import data from './data';
import notifications from './notifier/reducers';

const rootReducer = combineReducers({
  searchPage,
  user,
  data,
  notifications,
});

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunk)),
  );
}
