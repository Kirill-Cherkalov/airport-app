import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import moment from 'moment';
import queryString from 'query-string';
import './index.scss';
import HorizontalStepper from '../stepper';
import { resetTicketsInfo } from '../../redux/search/tickets/actions';
import { resetSelectedFlightInfo } from '../../redux/user/selectedFlight/actions';
import { resetReturnSelectedFlightInfo } from '../../redux/user/returnSelectedFlight/actions';
import { resetOrdersInfo } from '../../redux/user/orders/actions';
import { payForOrders, resetUserInfo } from '../../redux/user/actions';
import { fetchPaymentSuccessData, resetPaymentData } from '../../redux/payment/actions';

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
  fetchPaymentSuccessData,
  payForOrders,
  orders,
  resetPaymentData,
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
    fetchPaymentSuccessData: PropTypes.func.isRequired,
    payForOrders: PropTypes.func.isRequired,
    orders: PropTypes.array.isRequired,
    resetPaymentData: PropTypes.func.isRequired,
  };

  useEffect(() => {
    const { PayerID, paymentId } = queryString.parse(history.location.search);
    const executePaymentObject = {
      paymentId,
      executePaymentObject: {
        payer_id: PayerID,
        transactions: [{
          amount: {
            currency: 'USD',
            total: orders[0].total,
            details: {
              subtotal: orders[0].total,
            },
          },
        }],
      },
    };
    fetchPaymentSuccessData(executePaymentObject);
    payForOrders(orders);
  }, []);

  const flights = twoWayRequest ? [selectedFlight, returnSelectedFlight] : [selectedFlight];

  const goToStartPage = () => {
    resetTicketsInfo();
    resetSelectedFlightInfo();
    resetReturnSelectedFlightInfo();
    resetOrdersInfo();
    resetUserInfo();
    resetPaymentData();
    history.push('/search');
  };

  return (
    <>
      <div className="stepper-wrapper">
        <HorizontalStepper activeStep={5} />
      </div>
      <section className="tickets">
        {/* <div className="tickets-wrapper"> */}
        {/* <div className="" */}
          <div className={`tickets-wrapper ${twoWayRequest ? '' : 'one-way'}`}>
            {flights.map(({
              id, date, fromCountry, toCountry, startTime, endTime, passengersInfo,
            }) => (
              <section key={id} className="ticket">
                <div className="ticket__header">Flight ticket</div>
                <div className="ticket__departure-info">
                  <h1 className="ticket__destination">{fromCountry} - {toCountry}</h1>
                  <span className="ticket__time">{moment(startTime).format('LT')} - {moment(endTime).format('LT')} , {moment(date).format('MMM Do, YYYY')}</span>
                </div>
                <div className="passengers-info">
                  <div className="passengers-info__header">
                    <span>passenger name</span>
                    <span>seat</span>
                  </div>
                  {passengersInfo.map(({ firstname, lastname, selectedSeat }) => (
                    <div key={selectedSeat} className="passengers-info__details">
                      <span className="passengers-info__name">{firstname} {lastname}</span>
                      <span className="passengers-info__seat">{selectedSeat}</span>
                    </div>
                  ))}
                </div>
                <div className="ticket__footer">
                  <div className="ticket__barcode" />
                  {/* <img src="/assets/barcode.png" className="ticket__barcode" alt="code" /> */}
                  {/* <button type="button" className="ticket__print-button" onClick={() => window.print()}>PRINT TICKET</button> */}
                </div>
              </section>
            ))}
          </div>
          <div className="buttons-wrapper">
            <button type="button" className="button" onClick={goToStartPage}>to start</button>
            <button type="button" className="button" onClick={() => window.print()}>PRINT TICKET</button>
          </div>
        
      </section>
    </>
  );
}
const mapStateToProps = state => ({ 
  orders: state.user.ordersInfo.orders,
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
  fetchPaymentSuccessData: data => dispatch(fetchPaymentSuccessData(data)),
  payForOrders: orders => dispatch(payForOrders(orders)),
  resetPaymentData: () => dispatch(resetPaymentData()),
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(PaymentSuccess);
