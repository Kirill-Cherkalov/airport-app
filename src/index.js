import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './reset.scss';
import './index.scss';
// import Divider from '@material-ui/core/Divider';
import Header from './components/header';
import FlightsList from './components/flights-list';
import Login from './components/login';
import Register from './components/register';
import Search from './components/search';
import PassengersCounters from './components/passengers-counters';

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <Header />
            <Route path='/search' component={Search}></Route>
            <Route path='/passengers-counters' component={PassengersCounters}></Route>
            <Route path='/flights-list' component={FlightsList}></Route>
            <Route path='/login' component={Login}></Route>
            <Route path='/register' component={Register}></Route>
          </div>
        </Router>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
