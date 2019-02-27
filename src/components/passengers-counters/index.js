import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { styles } from './material.style';
import './index.scss';

class Passengers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      adult: 0,
      child: 0,
      infant: 0
    }
  }

  addPassenger = () => {}
  removePassenger = () => {}

  render() {
    const { classes } = this.props;

    return (
      <div className="counters">
        <div className="counter__wrapper">
          <button className="counter__button counter__button_minus">-</button>
          <div className="counter__info">{this.state.adult} adult</div>
          <button className="counter__button counter__button_plus">+</button>
        </div>
        <div className="counter__wrapper">
          <button className="counter__button counter__button_minus">-</button>
          <div className="counter__info">{this.state.child} child</div>
          <button className="counter__button counter__button_plus">+</button>
        </div>
        <div className="counter__wrapper">
          <button className="counter__button counter__button_minus">-</button>
          <div className="counter__info">{this.state.infant} infant</div>
          <button className="counter__button counter__button_plus">+</button>
        </div>

        <Button variant="contained" color="primary" className={classes.button} type="submit">
          OK
        </Button>
      </div>
    );
  }
}

Passengers.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Passengers);