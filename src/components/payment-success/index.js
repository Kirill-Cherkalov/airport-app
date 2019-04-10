import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import moment from 'moment';
import './index.scss';
import { resetTicketsInfo } from '../../redux/search/tickets/actions';
import { resetSelectedFlightInfo } from '../../redux/user/selectedFlight/actions';
import { resetReturnSelectedFlightInfo } from '../../redux/user/returnSelectedFlight/actions';
import { resetOrdersInfo } from '../../redux/user/orders/actions';
import { resetUserInfo } from '../../redux/user/actions';

function PaymentSuccess({
  history,
  selectedFlight,
  returnSelectedFlight,
  twoWayRequest,
  resetTicketsInfo,
  resetSelectedFlightInfo,
  resetReturnSelectedFlightInfo,
  resetOrdersInfo,
  resetUserInfo,
}) {
  PaymentSuccess.propTypes = {
    twoWayRequest: PropTypes.bool.isRequired,
    selectedFlight: PropTypes.object.isRequired,
    returnSelectedFlight: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    resetTicketsInfo: PropTypes.func.isRequired,
    resetSelectedFlightInfo: PropTypes.func.isRequired,
    resetReturnSelectedFlightInfo: PropTypes.func.isRequired,
    resetOrdersInfo: PropTypes.func.isRequired,
    resetUserInfo: PropTypes.func.isRequired,
  };

  const flights = twoWayRequest ? [selectedFlight, returnSelectedFlight] : [selectedFlight];

  const goToStartPage = () => {
    resetTicketsInfo();
    resetSelectedFlightInfo();
    resetReturnSelectedFlightInfo();
    resetOrdersInfo();
    resetUserInfo();
    history.push('/search');
  };

  return (
    <section className="tickets">
      <div className="tickets-wrapper">
        {flights.map(({
          id, date, fromCountry, toCountry, startTime, endTime, passengersInfo,
        }) => (
          <section key={id} className="ticket">
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

      <button type="button" className="button" onClick={goToStartPage}>to start</button>
    </section>
  );
}
const mapStateToProps = state => ({
  twoWayRequest: state.user.requestInfo.request.twoWayRequest,
  selectedFlight: state.user.selectedFlight,
  returnSelectedFlight: state.user.returnSelectedFlight,
});

const mapDispatchToProps = dispatch => ({
  resetTicketsInfo: () => dispatch(resetTicketsInfo()),
  resetSelectedFlightInfo: () => dispatch(resetSelectedFlightInfo()),
  resetReturnSelectedFlightInfo: () => dispatch(resetReturnSelectedFlightInfo()),
  resetOrdersInfo: () => dispatch(resetOrdersInfo()),
  resetUserInfo: () => dispatch(resetUserInfo()),
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(PaymentSuccess);
