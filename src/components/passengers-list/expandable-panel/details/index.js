import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import TextField from '../../../text-field';
import Luggage from './luggage';
import './index.scss';

export default function Details({ index }) {
  const requiredArray = value => value && value.length > 0 ? undefined : 'Required';

  return (
    <div className="expandable-panel-details">
      <div className="expandable-panel-details__names">
        <Field
          name={`firstname${index}`}
          validate={requiredArray}
          label="First Name"
          component={TextField}
          type="text"
          margin="dense"
        />
        <Field
          name={`lastname${index}`}
          validate={requiredArray}
          label="Last Name"
          component={TextField}
          type="text"
          margin="dense"
        />
      </div>
      <Luggage index={index} />
    </div>
  );
}

Details.propTypes = {
  index: PropTypes.number.isRequired,
};
