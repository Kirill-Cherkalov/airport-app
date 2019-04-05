import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { FaPlane } from 'react-icons/fa';
import './index.scss';

function FlightsListItems({
  flights, setTotalPrice, setSelectedFlightInfo, departureDate, returnSelectedFlightId, selectedFlightId,
}) {
  const setInfo = (price, flightInfo) => {
    setTotalPrice(price);
    const isReturn = !(moment(flightInfo.date).format('L') === moment(departureDate).format('L'));
    setSelectedFlightInfo(flightInfo, isReturn);
  };

  return (
    flights.map(({
      id, date, startTime, endTime, fromCountry, toCountry, price, planeInfo,
    }, index) => (
      <div
        id={id}
        key={index}
        className={`flights-list-item${id === returnSelectedFlightId || id === selectedFlightId ? ' selectedFlight' : ''}`}
      >
        <div className="flights-list-item__info">
          {/* <span className="date">{date}</span> */}
          <div className="info-wrapper">
            <div className="flight">
              <span className="flight__time">{startTime}</span>
              <span className="flight__country">{fromCountry}</span>
            </div>
            <FaPlane className="fa-arrow" />
            <div className="flight">
              <span className="flight__time">{endTime}</span>
              <span className="flight__country">{toCountry}</span>
            </div>
          </div>
        </div>
        <div className="flights-list-item__price">
          <button
            type="button"
            className="price-link"
            onClick={() => setInfo(price, {
              id, date, startTime, endTime, price, planeInfo,
            })}
          >
            $ {price}
          </button>
        </div>
      </div>
    ))
  );
}

const mapStateToProps = state => ({
  departureDate: state.user.request.departure,
  selectedFlightId: state.user.selectedFlight.id,
  returnSelectedFlightId: state.user.returnSelectedFlight.id,
});

export default connect(mapStateToProps)(FlightsListItems);
