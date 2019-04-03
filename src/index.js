import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './redux/configureStore';

import './reset.scss';
import './index.scss';

import Header from './components/header';
import FlightsList from './components/flights-list';
import Login from './components/login';
import Register from './components/register';
import Search from './components/search';
import PassengersCounters from './components/passengers-counters';
import PassengersList from './components/passengers-list';
import SeatsChoice from './components/passengers-seats';
import OrderDetails from './components/order-details';
import Payment from './components/payment';
import PaymentSuccess from './components/payment-success';

const store = configureStore();

function App() {
  return (
    <div>
      <Router>
        <div>
          <Header />
          {/* <Search /> */}
          <Route path="/search" component={Search} />
          <Route path="/passengers-counters" component={PassengersCounters} />
          <Route path="/flights-list" component={FlightsList} />
          <Route path="/passengers-seats" component={SeatsChoice} />
          <Route path="/passengers-list" component={PassengersList} />
          <Route path="/order-details" component={OrderDetails} />
          <Route path="/payment" component={Payment} />
          <Route path="/payment-success" component={PaymentSuccess} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </div>
      </Router>
    </div>
  );
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
