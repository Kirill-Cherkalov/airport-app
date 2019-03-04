import { createStore } from 'redux';
import tickets from './components/search/reducers';

export const store = createStore(tickets());