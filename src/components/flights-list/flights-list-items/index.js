import React from 'react';
import { withRouter } from 'react-router';
import './index.scss';

function FlightsListItems({
  flights, setTotalPrice, setSelectedFlightInfo, history,
}) {
  const setInfo = (price, flightInfo) => {
    setTotalPrice(price);
    setSelectedFlightInfo(flightInfo);
    return history.push('/passengers-list');
  };

  return (
    flights.map(({
      id, date, startTime, endTime, fromCountry, toCountry, price, planeId,
    }) => (
      <div key={id} className="flights-list-item">
        <div className="flights-list-item__info">
          <span className="date">{date}</span>
          <div className="info-wrapper">
            <div className="flight">
              <span className="flight__time">{startTime}</span>
              <span className="flight__country">{fromCountry}</span>
            </div>
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
              id, date, startTime, endTime, price, planeId,
            })}
          >
            $ {price}
          </button>
        </div>
      </div>
    ))
  );
}

export default withRouter(FlightsListItems);
