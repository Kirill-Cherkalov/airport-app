import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './components/search/store/configureStore';

import './reset.scss';
import './index.scss';

import Header from './components/header';
import FlightsList from './components/flights-list';
import Login from './components/login';
import Register from './components/register';
import Search from './components/search';
import {PassengersCounters} from './components/passengers-counters';
import {PassengersList} from './components/passengers-list';
import {SeatsChoice} from './components/passengers-seats';

const store = configureStore();

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <Header />
            {/* <Search /> */}
            <Route path='/search' component={Search}></Route>
            <Route path='/passengers-counters' component={PassengersCounters}></Route>
            <Route path='/flights-list' component={FlightsList}></Route>
            <Route path='/passengers-seats' component={SeatsChoice}></Route>
            <Route path='/passengers-list' component={PassengersList}></Route>
            <Route path='/login' component={Login}></Route>
            <Route path='/register' component={Register}></Route>
          </div>
        </Router>
      </div>
    );
  }
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root'));
