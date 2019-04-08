import React from 'react';
import PropTypes from 'prop-types';
import PlaneSeats from './plane-seats';
import SeatsSigns from './seats-signs';
import './index.scss';

function Plane({
  setInfo, location, rows, passengersInfo, selectedPassenger, soldSeats,
}) {
  Plane.propTypes = {
    rows: PropTypes.number.isRequired,
    location: PropTypes.array.isRequired,
    passengersInfo: PropTypes.array.isRequired,
    selectedPassenger: PropTypes.number.isRequired,
    soldSeats: PropTypes.array.isRequired,
    setInfo: PropTypes.func.isRequired,
  };

  return (
    <div className="plane">
      <div className="plane__cockpit" />
      <div className="plane__exit plane__exit_front" />
      <SeatsSigns signs={location} />
      <PlaneSeats
        setInfo={setInfo}
        rows={rows}
        location={location}
        passengersInfo={passengersInfo}
        selectedPassenger={selectedPassenger}
        soldSeats={soldSeats}
      />
      <div className="plane__exit plane__exit_back" />
      <div className="plane__cockpit_invert" />
    </div>
  );
}

export default Plane;
