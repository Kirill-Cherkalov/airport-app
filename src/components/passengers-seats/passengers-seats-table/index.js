import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import TableRows from './table-rows';
import './index.scss';

function PassengersSeatsTable({ history }) {
  PassengersSeatsTable.propTypes = {
    history: PropTypes.object.isRequired,
  };

  const goToOrderDetailsPage = () => history.push('/order-details');

  return (
    <div className="passenger-seats-container">
      <table className="passengers-seats">
        <tbody>
          <TableRows />
        </tbody>
      </table>
      <button type="button" onClick={goToOrderDetailsPage} className="button">Continue</button>
    </div>
  );
}

export default withRouter(PassengersSeatsTable);
