import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { styles } from './material.style';
import './index.scss';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    }
  }

  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  render() {
    const { classes } = this.props;

    return (
      <form className="login-form" noValidate autoComplete="off">
        <div className="login-form__container">
          <TextField
            label="Email"
            className="textfield"
            type="email"
            onChange={this.handleChange('email')}
            margin="dense"
          />
          <TextField
            label="Password"
            className="textfield"
            type="password"
            onChange={this.handleChange('password')}
            margin="dense"
          />
          <Button variant="contained" color="primary" className={classes.button} type="submit">
            Log in
          </Button>
          
          <Link to="/register">Registration</Link>
        </div>
      </form>
    );
  }
}

export default withStyles(styles)(Login);