import React from 'react';
import { Form, Field } from 'react-final-form';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import axios from 'axios';
import urls from '../../urls';
import styles from './material.style';
import TextField from '../text-field';
import validate from './validate';
import './index.scss';
import '../../styles/button.scss';

class Login extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };

  handleChange = name => (event) => {
    this.setState({ [name]: event.target.value });
  };

  onSubmit = (values) => {
    axios.post(urls.sendLoginFormData, values)
      .then((response) => {
        localStorage.setItem('id', response.data.id);
        localStorage.setItem('token', response.data.token);
      })
      .catch(err => localStorage.setItem('error', err));

    this.props.history.goBack();
  };

  render() {
    const { classes } = this.props;
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
                className={classes.textField}
                type="email"
                label="Email"
                margin="dense"
                variant="outlined"
              />
              <Field
                name="password"
                component={TextField}
                className={classes.textField}
                type="password"
                label="Password"
                margin="dense"
                variant="outlined"
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
