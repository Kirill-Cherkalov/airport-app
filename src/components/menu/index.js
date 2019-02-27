import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {styles} from './material.style';
import './index.scss'

function HeaderMenu(props) {
  const { classes } = props;
  return (
    <div className='header__menu'>
      <Button color="inherit" className={classes.button}>flights</Button>
      <Button color="inherit" className={classes.button}>tickets</Button>
      <Button color="inherit" className={classes.button}>about us</Button>
      {/* <Button color="inherit" href="#text-buttons" disabled className={classes.button}>
        Link
      </Button> */}
      <Button className={classes.button}>Login</Button>
    </div>
  );
}

HeaderMenu.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HeaderMenu);