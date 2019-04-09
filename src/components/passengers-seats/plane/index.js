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
      <SeatsSigns signs={location} />
      <PlaneSeats
        setInfo={setInfo}
        rows={rows}
        location={location}
        passengersInfo={passengersInfo}
        selectedPassenger={selectedPassenger}
        soldSeats={soldSeats}
      />
    </div>
  );
}

export default Plane;
