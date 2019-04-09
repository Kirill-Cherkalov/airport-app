import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './index.scss';

const Menu = props => (
  <div className={props.className}>
    <Link to="/orders-history" className="link-to">Orders History</Link>
    <Link to="/search" className="link-to">Flights</Link>
    <Link to="/flights-list" className="link-to">Tickets</Link>
    <Link to="/passengers-list" className="link-to">Passengers</Link>
    <Link to="/" className="link-to">About us</Link>
    <Link to="/login" className="link-to">Login</Link>
  </div>
);

Menu.propTypes = {
  className: PropTypes.any.isRequired,
};

export default Menu;
