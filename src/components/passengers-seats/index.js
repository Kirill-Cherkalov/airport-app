import React from 'react';
import PassengersSeatsTable from './passengers-seats-table';
import Plane from './plane';
import './index.scss';

function SeatsChoice() {
  return (
    <div className="seats-choice-container">
      <PassengersSeatsTable />
      <Plane />
    </div>
  );
}

export default SeatsChoice;
