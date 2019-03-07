import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './index.scss';

export default function Menu(props) {
  Menu.propTypes = {
    className: PropTypes.any.isRequired,
  };

  return (
    <div className={props.className}>
      <Link to="/search" className="link-to">flights</Link>
      <Link to="/flights-list" className="link-to">tickets</Link>
      <Link to="/passengers-list" className="link-to">Passengers</Link>
      <Link to="/" className="link-to">about us</Link>
      <Link to="/login" className="link-to">Login</Link>
    </div>
  );
}
