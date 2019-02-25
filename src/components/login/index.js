import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { styles } from './material.style';

class Login extends React.Component {
  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          label="Email"
          className="textfield"
          type="email"
          onChange={this.handleChange('name')}
          margin="dense"
        />
        <TextField
          label="Password"
          className="textfield"
          type="password"
          onChange={this.handleChange('name')}
          margin="dense"
        />
        <Button variant="contained" color="primary" className={classes.button} type="submit">
          Log in
        </Button>
        
        <Link to="/register"><Button variant="contained" color="default" className={classes.button} type="submit">Registration</Button></Link>
      </form>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);