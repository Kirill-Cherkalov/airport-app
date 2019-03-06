import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import searchPage from './search';
// import rootReducer from './search';
import ticketsPage from './flights-list';

const rootReducer = combineReducers({
  searchPage,
  ticketsPage
});

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunk))
  );
}