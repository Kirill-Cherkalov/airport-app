import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import LoginMenu from '../login-menu';
import './index.scss';

const Menu = props => (
  <div className={props.className}>
    <Link to="/search" className="link-to">Search</Link>
    {props.loggedInUser && <Link to="/orders-history" className="link-to">My orders</Link>}
    <LoginMenu />
  </div>
);

Menu.propTypes = {
  className: PropTypes.any.isRequired,
  loggedInUser: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  loggedInUser: state.user.requestInfo.loggedInUser,
});

export default connect(mapStateToProps)(Menu);
