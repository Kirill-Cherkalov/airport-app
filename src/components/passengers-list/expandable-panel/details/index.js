import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Luggage from './luggage';
import './index.scss';

export default function Details({ selectLuggage, handleChange }) {
  Details.propTypes = {
    selectLuggage: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
  };

  return (
    <div className="expandable-panel-details">
      <div className="expandable-panel-details__names">
        <TextField
          label="First Name"
          className="textfield"
          onChange={handleChange('firstName')}
          margin="dense"
        />
        <TextField
          label="Last Name"
          className="textfield"
          onChange={handleChange('lastName')}
          margin="dense"
        />
      </div>
      <Luggage selectLuggage={selectLuggage} />
    </div>
  );
}
