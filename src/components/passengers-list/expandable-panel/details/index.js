import React from 'react';
import TextField from '@material-ui/core/TextField';
import {Luggage} from './luggage';
import './index.scss';

export function Details({selectLuggage, handleChange}) {
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
      <Luggage selectLuggage={selectLuggage}/>
    </div>
  );
}