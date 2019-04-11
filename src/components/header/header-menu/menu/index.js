import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logInUser, resetUserInfo } from '../../../../redux/user/actions';
import { resetTicketsInfo } from '../../../../redux/search/tickets/actions';
import { resetSelectedFlightInfo } from '../../../../redux/user/selectedFlight/actions';
import { resetReturnSelectedFlightInfo } from '../../../../redux/user/returnSelectedFlight/actions';
import { resetOrdersInfo } from '../../../../redux/user/orders/actions';
import LoginMenu from '../login-menu';
import './index.scss';

function Menu(props) {
  Menu.propTypes = {
    className: PropTypes.any.isRequired,
    loggedInUser: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    logInUser: PropTypes.func.isRequired,
    resetTicketsInfo: PropTypes.func.isRequired,
    resetSelectedFlightInfo: PropTypes.func.isRequired,
    resetReturnSelectedFlightInfo: PropTypes.func.isRequired,
    resetOrdersInfo: PropTypes.func.isRequired,
    resetUserInfo: PropTypes.func.isRequired,
  };

  const logOut = () => {
    localStorage.clear();
    props.resetTicketsInfo();
    props.resetSelectedFlightInfo();
    props.resetReturnSelectedFlightInfo();
    props.resetOrdersInfo();
    props.resetUserInfo();
    props.logInUser(false);
  };

  const showLinks = () => {
    if (props.onClick) {
      if (props.loggedInUser) {
        return (
          <>
            <Link
              to="/orders-history"
              className="link-to"
              onClick={props.onClick}
            >
              My orders
            </Link>
            <Link to="/search" className="link-to" onClick={logOut}>
              Logout
            </Link>
          </>
        );
      }

      return (
        <>
          <Link
            to="/login"
            className="link-to"
            onClick={props.onClick}
          >
            Log In
          </Link>
          <Link
            to="/register"
            className="link-to"
            onClick={props.onClick}
          >
            Register
          </Link>
        </>
      );
    }

    return <LoginMenu logOut={logOut} />;
  };

  return (
    <div className={props.className}>
      <Link
        to="/search"
        className="link-to"
        onClick={props.onClick}
      >
        Search
      </Link>
      {showLinks()}
    </div>
  );
}

const mapStateToProps = state => ({
  loggedInUser: state.user.requestInfo.loggedInUser,
});

const mapDispatchToProps = dispatch => ({
  logInUser: bool => dispatch(logInUser(bool)),
  resetTicketsInfo: () => dispatch(resetTicketsInfo()),
  resetSelectedFlightInfo: () => dispatch(resetSelectedFlightInfo()),
  resetReturnSelectedFlightInfo: () => dispatch(resetReturnSelectedFlightInfo()),
  resetOrdersInfo: () => dispatch(resetOrdersInfo()),
  resetUserInfo: () => dispatch(resetUserInfo()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
