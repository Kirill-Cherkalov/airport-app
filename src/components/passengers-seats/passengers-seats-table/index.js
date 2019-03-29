import React from 'react';
import TableRows from './table-rows';
import './index.scss';

export default function PassengersSeatsTable() {
  return (
    <div className="passenger-seats-container">
      <table className="passengers-seats">
        <tbody>
          <TableRows />
        </tbody>
      </table>
      <button type="button" className="button">Continue</button>
    </div>
  );
}
