import React from 'react';
import TableRows from './table-rows';
import './index.scss';

export default function PassengersSeatsTable() {
  const passengers = [
    {
      type: 'adult',
      amount: 2,
    },
    {
      type: 'child',
      amount: 3,
    },
    {
      type: 'infant',
      amount: 3,
    },
  ];

  return (
    <div className="passenger-seats-container">
      <table className="passengers-seats">
        <tbody>
          <TableRows passengers={passengers} />
        </tbody>
      </table>
    </div>
  );
}
