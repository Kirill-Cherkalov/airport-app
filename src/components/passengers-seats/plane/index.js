import React from 'react';
import PlaneSeats from './plane-seats';
import SeatsSigns from './seats-signs';
import './index.scss';

export default class Plane extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // place: null,
    };
  }

  render() {
    const signs = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];
    const plane = {
      rows: 20,
      location: [1, 1, 1, 0, 1, 1, 0, 1, 1, 1],
    };

    return (
      <div className="plane">
        <SeatsSigns rowSeats={plane.rowSeats} location={plane.location} signs={signs} />
        <PlaneSeats rows={plane.rows} location={plane.location} signs={signs} />
      </div>
    );
  }
}
