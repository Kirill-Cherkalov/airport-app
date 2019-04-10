import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

function PassengersSeatsTable({ flight, passengersInfo, setSelectedPassenger, selectedPassenger }) {
  PassengersSeatsTable.propTypes = {
    flight: PropTypes.object.isRequired,
    passengersInfo: PropTypes.array.isRequired,
    setSelectedPassenger: PropTypes.func.isRequired,
    selectedPassenger: PropTypes.number.isRequired,
  };

  const select = event => setSelectedPassenger(+event.target.id);

  return (
    <div className="passenger-seats-container">
      <table className="passengers-seats">
        <tbody>
          <tr>
            <th className="th" colSpan="2">
              {flight.fromCountry} - {flight.toCountry}
            </th>
          </tr>
          {passengersInfo.map(({ firstname, lastname }, index) => (
            <tr key={index} className={`passengers-seats__passenger ${selectedPassenger === index ? 'selected' : ''}`}>
              <td className="passengers-seats__info td">{firstname} {lastname}</td>
              <td
                id={index}
                className="passengers-seats__seat td"
                onClick={select}
              >
                {passengersInfo[index].selectedSeat || 'seat'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PassengersSeatsTable;
