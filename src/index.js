import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './reset.scss';
import './index.scss';
import Divider from '@material-ui/core/Divider';
import Header from './components/header';
import Register from './components/register';
import Login from './components/login';
import Search from './components/search-page';
import Passengers from './components/passengers-counters';
import FlightsList from './components/flights-list';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <FlightsList />
        <Divider variant="middle" />
        <Register />
        <Divider variant="middle" />

        <Login />
        <Divider variant="middle" />

        <Search />
        <Divider variant="middle" />

        <Passengers />
        <Divider variant="middle" />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
