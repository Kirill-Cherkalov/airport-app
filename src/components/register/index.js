import React from 'react';
import PropTypes from 'prop-types';
import { Form, Field } from 'react-final-form';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { FaUserPlus } from 'react-icons/fa';
import { authoriseUser } from '../../redux/user/actions';
import styles from './material.style';
import TextField from '../text-field';
import validate from './validate';
import './index.scss';
import '../../styles/button.scss';

class Register extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    authoriseUser: PropTypes.func.isRequired,
  };

  handleChange = name => (event) => {
    this.setState({ [name]: event.target.value });
  };

  onSubmit = values => this.props.authoriseUser(values);

  render() {
    const { classes } = this.props;

    return (
      <Form
        onSubmit={this.onSubmit}
        validate={validate}
        render={({ handleSubmit }) => (
          <form className="register-form" onSubmit={handleSubmit}>
            <div className="register-form__container">
              <FaUserPlus className="register-form__icon" />
              <h1 className="register-form__header">Register</h1>
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
                Register
              </button>
            </div>
          </form>
        )}
      />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  authoriseUser: userInfo => dispatch(authoriseUser(userInfo)),
});

export default compose(
  withStyles(styles),
  connect(null, mapDispatchToProps),
)(Register);
