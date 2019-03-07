import React from 'react';
import PropTypes from 'prop-types';

export default function SeatsSigns({ location, signs }) {
  SeatsSigns.propTypes = {
    location: PropTypes.array.isRequired,
    signs: PropTypes.array.isRequired,
  };

  return (
    <div className="row">
      {location.map((elem, index) => (elem
        ? <div key={Math.random()} className="sign seat"><span className="sign seat">{signs[index]}</span></div>
        : <div key={Math.random()} className="empty" />))}
    </div>
  );
}
