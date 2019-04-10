import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { SecureRoute } from 'react-route-guard';
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
import OrdersHistory from './components/orders-history';
import UserRouteGuard from './auth-service';
import NotFoundPage from './components/not-found';

const store = configureStore();

function App() {
  return (
    <div>
      <Router>
        <div>
          <Header />
          <Switch>
            <Route path="/search" component={Search} />
            <Route path="/passengers-counters" component={PassengersCounters} />
            <Route path="/flights-list" component={FlightsList} />
            <SecureRoute path="/passengers-list" component={PassengersList} routeGuard={UserRouteGuard} redirectToPathWhenFail="/login" />
            <SecureRoute path="/passengers-seats" component={SeatsChoice} routeGuard={UserRouteGuard} redirectToPathWhenFail="/login" />
            <SecureRoute path="/order-details" component={OrderDetails} routeGuard={UserRouteGuard} redirectToPathWhenFail="/login" />
            <SecureRoute path="/payment" component={Payment} routeGuard={UserRouteGuard} redirectToPathWhenFail="/login" />
            <SecureRoute path="/payment-success" component={PaymentSuccess} routeGuard={UserRouteGuard} redirectToPathWhenFail="/login" />
            <SecureRoute path="/orders-history" component={OrdersHistory} routeGuard={UserRouteGuard} redirectToPathWhenFail="/login" />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route component={NotFoundPage} />
          </Switch>
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
