import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import moment from 'moment';
import './index.scss';

function PaymentSuccess({
  history, selectedFlight, returnSelectedFlight, requestInfo,
}) {
  PaymentSuccess.propTypes = {
    requestInfo: PropTypes.bool.isRequired,
    selectedFlight: PropTypes.object.isRequired,
    returnSelectedFlight: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };

  const flights = requestInfo ? [selectedFlight, returnSelectedFlight] : [selectedFlight];

  const goToStartPage = () => {
    history.push('/search');
  };

  return (
    <section className="tickets">
      <div className="tickets-wrapper">
        {flights.map(({
          date, fromCountry, toCountry, startTime, endTime, passengersInfo,
        }, index) => (
          <section key={index} className="ticket">
            <div className="ticket__header">Flight ticket</div>
            <div className="ticket__departure-info">
              <h1 className="ticket__destination">{fromCountry} - {toCountry}</h1>
              <span className="ticket__time">{startTime} - {endTime} , {moment(date).format('MMM Do, YYYY')}</span>
            </div>
            <div className="passengers-info">
              <div className="passengers-info__header">
                <span>passenger name</span>
                <span>seat</span>
              </div>
              {passengersInfo.map(({ firstname, lastname, selectedSeat }) => (
                <div className="passengers-info__details">
                  <span className="passengers-info__name">{firstname} {lastname}</span>
                  <span className="passengers-info__seat">{selectedSeat}</span>
                </div>
              ))}
            </div>
            <div className="ticket__footer">
              <div className="ticket__barcode" />
              <button type="button" className="ticket__print-button">PRINT TICKET</button>
            </div>
          </section>
        ))}
      </div>

      <button type="button" className="button" onClick={goToStartPage}>goToStartPage</button>
    </section>
  );
}
const mapStateToProps = state => ({
  twoWayRequest: state.user.requestInfo.request.twoWayRequest,
  selectedFlight: state.user.selectedFlight,
  returnSelectedFlight: state.user.returnSelectedFlight,
});

export default compose(
  withRouter,
  connect(mapStateToProps),
)(PaymentSuccess);
