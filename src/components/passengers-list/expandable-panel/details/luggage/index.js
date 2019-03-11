// /* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
// import Avatar from '@material-ui/core/Avatar';
// import WorkIcon from '@material-ui/icons/Work';
import './index.scss';

export default function Luggage({ index }) {
  Luggage.propTypes = {
    index: PropTypes.number.isRequired,
  };

  const luggageTypes = [
    {
      kg: '10',
      price: '9',
    },
    {
      kg: '20',
      price: '15',
    },
    {
      kg: '30',
      price: '21',
    },
    {
      kg: 'free carry-on bag',
      price: '0',
    },
  ];

  return (
    <div className="luggage-list">
      {luggageTypes.map(({ kg, price }) => (
        <label htmlFor={price}>
          <Field
            id={price}
            name={'luggage' + index}
            component="input"
            type="radio"
            value={price}
          />{' '}
          {kg} kg
        </label>
      ))}
    </div>
  );
}
