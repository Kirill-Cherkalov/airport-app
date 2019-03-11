/* eslint-disable no-plusplus */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import TableRow from './table-row';
import './index.scss';

export default function TableRows({ passengers }) {
  TableRows.propTypes = {
    passengers: PropTypes.array.isRequired,
  };

  let i = 1;
  return (
    <>
      {passengers.map(({ type, amount }) => {
        const arr = new Array(amount).fill(amount);

        return (
          <Fragment key={Math.random()}>
            {arr.map(() => <TableRow key={Math.random()} type={type} index={i++} />)}
          </Fragment>
        );
      })}
    </>
  );
}
