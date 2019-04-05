import React from 'react';
import PropTypes from 'prop-types';
import { Form, Field } from 'react-final-form';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import urls from '../../urls';
import styles from './material.style';
import TextField from '../text-field';
import './index.scss';
import '../../styles/button.scss';
import validate from './validate';

class Register extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  handleChange = name => (event) => {
    this.setState({ [name]: event.target.value });
  };

  onSubmit = async (values) => {
    axios.post(urls.sendRegisterFormData, values)
      .then((response) => {
        localStorage.setItem('id', response.data.id);
        localStorage.setItem('token', response.data.token);
      })
      .catch(err => localStorage.setItem('register error', JSON.stringify(err)));
  };

  render() {
    const { classes } = this.props;

    return (
      <Form
        onSubmit={this.onSubmit}
        validate={validate}
        render={({ handleSubmit }) => (
          <form className="register-form" onSubmit={handleSubmit}>
            <div className="register-form__container">
              <Field
                name="firstName"
                component={TextField}
                className={classes.textField}
                type="text"
                label="First Name"
                margin="dense"
                variant="outlined"
              />
              <Field
                name="lastName"
                component={TextField}
                className={classes.textField}
                type="text"
                label="Last Name"
                margin="dense"
                variant="outlined"
              />
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
                Submit
              </button>
            </div>
          </form>
        )}
      />
    );
  }
}

export default withStyles(styles)(Register);
