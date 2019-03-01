import React from 'react';
import Button from '@material-ui/core/Button';
import './index.scss';

export class PassengersCounters extends React.Component {
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
    const passengersTypes = ["adult", "child", "infant"];

    return (
      <div className="counters">
        <div className="counters__container">
          {passengersTypes.map(type => 
            <div className="counter__wrapper" key={Math.random()}>
              <button className="counter__button counter__button_minus">-</button>
              <div className="counter__info">{this.state[type]} {type}</div>
              <button className="counter__button counter__button_plus">+</button>
            </div>
          )}

          <Button variant="contained" color="primary" type="submit">
            OK
          </Button>
        </div>
      </div>
    );
  }
}