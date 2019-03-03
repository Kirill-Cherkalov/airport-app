import React from 'react';
import { Form, Field } from "react-final-form";
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './material.style';
import TextField from '../text-field';
import './index.scss';
import '../../styles/button.scss';
import {validate} from './validate';

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

  onSubmit = async values => {
    const e = JSON.stringify(values);
    localStorage.setItem("login", e);
  };

  render() {
    return (
      <Form
        onSubmit={this.onSubmit}
        validate={validate}
        render={({ handleSubmit }) => (
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="login-form__container">
              <Field
                name="email"
                component={TextField}
                type="email"
                label="Email"
                margin="dense"
              />
              <Field
                name="password"
                component={TextField}
                type="password"
                label="Password"
                margin="dense"
              />
              <button className="button" type="submit">
                Log in
              </button>
              
              <Link to="/register">Registration</Link>
            </div>
          </form>
        )}
      />
    );
  }
}

export default withStyles(styles)(Login);