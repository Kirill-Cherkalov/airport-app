import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { logInUser } from '../../../../redux/user/actions';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

class LoginMenu extends React.Component {
  static propTypes = {
    logInUser: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
  };

  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  logOut = () => {
    localStorage.clear();
    this.props.logInUser(false);
  }

  render() {
    const { anchorEl } = this.state;
    const token = localStorage.getItem('token');

    return (
      <div className="login-menu">
        <button
          type="button"
          className="link-to login-menu__user-icon-button"
          onClick={this.handleClick}
        >
          <FaUserCircle className="login-menu__user-icon" />
        </button>
        {token
          ? (
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={this.handleClose}
            >
              <MenuItem onClick={this.handleClose}>
                <Link to="/search" className="login-menu__link-to" onClick={this.logOut}>
                  Logout
                </Link>
              </MenuItem>
            </Menu>
          )
          : (
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={this.handleClose}
            >
              <MenuItem onClick={this.handleClose}>
                <Link to="/login" className="login-menu__link-to">
                  Log In
                </Link>
              </MenuItem>
              <MenuItem onClick={this.handleClose}>
                <Link to="/register" className="login-menu__link-to">
                  Register
                </Link>
              </MenuItem>
            </Menu>
          )
          }
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  logInUser: bool => dispatch(logInUser(bool)),
});

export default compose(
  connect(null, mapDispatchToProps),
  withRouter,
)(LoginMenu);
