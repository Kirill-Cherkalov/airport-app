import React from 'react';
import Button from '@material-ui/core/Button';
import Person from '@material-ui/icons/Person';
import './index.scss';

export default class PassengersCounters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      adult: 0,
      child: 0,
      infant: 0,
    };
  }

  addPassenger = () => {}

  removePassenger = () => {}

  render() {
    const passengersTypes = ['adult', 'child', 'infant'];

    return (
      <div className="counters">
        <div className="counters__container">
          <div className="counters__icon">
            <Person />
          </div>
          {passengersTypes.map(type => (
            <div className="counter__wrapper" key={Math.random()}>
              <button type="button" className="counter__button counter__button_minus">-</button>
              <div className="counter__info">{this.state[type]} {type}</div>
              <button type="button" className="counter__button counter__button_plus">+</button>
            </div>
          ))}

          <Button variant="contained" color="primary" type="submit">
            OK
          </Button>
        </div>
      </div>
    );
  }
}
