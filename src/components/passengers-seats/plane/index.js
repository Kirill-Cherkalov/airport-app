import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PlaneSeats from './plane-seats';
import SeatsSigns from './seats-signs';
import './index.scss';

function Plane({ location, rows }) {
  Plane.propTypes = {
    rows: PropTypes.number.isRequired,
    location: PropTypes.array.isRequired,
  };

  return (
    <div className="plane">
      {location && <SeatsSigns signs={location} />}
      {location && <PlaneSeats rows={rows} location={location} />}
    </div>
  );
}

const mapStateToProps = state => ({
  rows: state.user.selectedFlight.planeInfo.rows,
  location: state.user.selectedFlight.planeInfo.location,
});

export default connect(mapStateToProps)(Plane);
