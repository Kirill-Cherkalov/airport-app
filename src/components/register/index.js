import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { styles } from './material.style';
import './index.scss';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
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
      <form className="register-form" noValidate autoComplete="off">
        <div className="register-form__container">
          <TextField
            label="First Name"
            className="textfield"
            onChange={this.handleChange('firstName')}
            margin="dense"
          />
          <TextField
            label="Last Name"
            className="textfield"
            onChange={this.handleChange('lastName')}
            margin="dense"
          />
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
            Submit
          </Button>
        </div>
      </form>
    );
  }
}

export default withStyles(styles)(Register);