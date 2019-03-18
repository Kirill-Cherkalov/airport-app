import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import searchPage from './search';
import user from './user/reducers';
import data from './data';

const rootReducer = combineReducers({
  searchPage,
  user,
  data,
});

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunk)),
  );
}
