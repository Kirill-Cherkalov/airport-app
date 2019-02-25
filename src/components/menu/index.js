import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {styles} from './material.style';
import './index.scss';

import { Link } from 'react-router-dom';

function HeaderMenu(props) {
  const { classes } = props;
  return (
    <div className='header__menu'>
      <Link to="/search"><Button color="inherit" className={classes.button}>flights</Button></Link>
      <Link to="/flights-list"><Button color="inherit" className={classes.button}>tickets</Button></Link>
      <Button color="inherit" className={classes.button}>about us</Button>
      <Link to="/login"><Button className={classes.button}>Login</Button></Link>
    </div>
  );
}

HeaderMenu.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HeaderMenu);