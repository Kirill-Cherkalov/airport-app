import { createStore, applyMiddleware, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import searchPage from './search';
import user from './user';
import data from './data';
import payment from './payment/reducers';
import notifications from './notifier/reducers';

const rootReducer = combineReducers({
  searchPage,
  user,
  data,
  payment,
  notifications,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// export default (initialState) => {
export default () => {
  const store = createStore(
    persistedReducer,
    // initialState,
    composeWithDevTools(applyMiddleware(thunk)),
  );
  const persistor = persistStore(store);
  return { store, persistor };
};

// export default function configureStore(initialState) {
//   return createStore(
//     rootReducer,
//     initialState,
//     composeWithDevTools(applyMiddleware(thunk)),
//   );
// }
