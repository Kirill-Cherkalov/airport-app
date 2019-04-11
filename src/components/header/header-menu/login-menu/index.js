import React from 'react';
import PropTypes from 'prop-types';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withRouter, Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

class LoginMenu extends React.Component {
  static propTypes = {
    logOut: PropTypes.func.isRequired,
  };

  state = {
    anchorEl: null,
  };

  handleClick = event => this.setState({ anchorEl: event.currentTarget });

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

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
                <Link to="/search" className="login-menu__link-to" onClick={this.props.logOut}>
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

export default withRouter(LoginMenu);
