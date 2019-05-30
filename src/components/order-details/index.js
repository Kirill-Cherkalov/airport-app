import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import { FaCheck, FaRegUserCircle } from 'react-icons/fa';
import PropTypes from 'prop-types';
import moment from 'moment';
import HorizontalStepper from '../stepper';
import { fetchPaymentData } from '../../redux/payment/actions';
import { getUserOrders } from '../../redux/user/orders/actions';
import urls from '../../urls';
import './index.scss';

function OrderDetails({
  requestInfo, selectedFlight, returnSelectedFlight, history, fetchPaymentData, paymentData, setUserOrdersData,
}) {
  OrderDetails.propTypes = {
    requestInfo: PropTypes.object.isRequired,
    selectedFlight: PropTypes.object.isRequired,
    returnSelectedFlight: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    fetchPaymentData: PropTypes.func.isRequired,
    paymentData: PropTypes.string.isRequired,
    setUserOrdersData: PropTypes.func.isRequired,
  };

  const flights = requestInfo.twoWayRequest ? [selectedFlight, returnSelectedFlight] : [selectedFlight];
  const { adult, child, infant } = requestInfo;
  const passengersAmount = adult + child + infant;

  const getTicketPrice = passengersInfo => passengersInfo.reduce((total, { luggagePrice: price }) => total + price, 0);

  const setOrdersData = (total) => {
    const orders = flights.map(flight => ({
      user: localStorage.getItem('id'),
      fromCountry: flight.fromCountry,
      toCountry: flight.toCountry,
      departureDate: flight.date,
      startTime: flight.startTime,
      endTime: flight.endTime,
      passengersAmount,
      selectedFlight: flight.id,
      passengersInfo: flight.passengersInfo,
      total,
    }));

    setUserOrdersData(orders);
  };

  const constructPaymentObject = () => {
    const paymentObject = {
      intent: 'sale',
      payer: {
        payment_method: 'paypal',
      },
      redirect_urls: {
        return_url: urls.returnUrl,
        cancel_url: urls.cancelUrl,
      },
      transactions: [{
        item_list: {
          items: [],
        },
        amount: {
          currency: 'USD',
          total: '',
        },
        description: '',
      }],
    };

    let total = 0;

    flights.forEach(({ fromCountry, toCountry, price, passengersInfo }) => {
      const items = [{
        name: 'Flight ticket',
        sku: `1 tck: ${fromCountry} - ${toCountry}`,
        price,
        currency: 'USD',
        quantity: passengersInfo.length,
      }];

      total += price * passengersInfo.length;

      passengersInfo.forEach(({ firstname, lastname, luggageKg, luggagePrice }) => {
        total += luggagePrice;

        items.push({
          name: `luggage: ${luggageKg} kg`,
          sku: `for ${firstname} ${lastname}`,
          price: luggagePrice,
          currency: 'USD',
          quantity: 1,
        });
      });

      paymentObject.transactions[0].item_list.items = [...paymentObject.transactions[0].item_list.items, ...items];
    });

    paymentObject.transactions[0].amount.total = total;

    let description = `${flights[0].fromCountry} - ${flights[0].toCountry}`;
    if (flights.length > 1) {
      description += ` || ${flights[0].toCountry} - ${flights[0].fromCountry}`;
    }
    paymentObject.transactions[0].description = description;

    return paymentObject;
  };

  const goToPaymentPage = async () => {
    const paymentObject = constructPaymentObject();
    await fetchPaymentData(paymentObject);
    await setOrdersData(paymentObject.transactions[0].amount.total);
    if (paymentData) window.location = paymentData;
  };

  return (
    <>
      <HorizontalStepper activeStep={2} />
      <section className="order-details">
        <div className="order-details-wrapper">
          {flights.map(({
            date, fromCountry, toCountry, startTime, endTime, price, passengersInfo,
          }, index) => (
            <div key={index} className={flights.length === 1 ? 'one-ticket' : 'two-tickets'}>
              <section className="order-details__flight">
                <div className="order-details__header">
                  <FaCheck className="order-details__icon" />
                  <span className="order-details__text">Flight</span>
                </div>

                <div className="flight-info">
                  <span className="flight-info__date">{moment(date).format('MMM Do')}</span>
                  <div className="flight-info__wrapper">
                    <span className="flight-info__direction">{fromCountry} - {toCountry}</span>
                    <span className="flight-info__time">{moment(startTime).format('LT')} - {moment(endTime).format('LT')}</span>
                  </div>
                </div>

                <div className="about-price">
                  <span className="about-price__text">{passengersAmount} x Flight ticket</span>
                  <span className="about-price__amount">$ {price * passengersAmount}</span>
                </div>
              </section>

              <section className="order-details__passengers">
                <div className="order-details__header">
                  <FaCheck className="order-details__icon" />
                  <span className="order-details__text">Passengers</span>
                </div>

                {passengersInfo.map((passenger, i) => (
                  <div className="passengers-info" key={i}>
                    <div className="passengers-info__about">
                      <FaRegUserCircle className="passengers-info__icon" />
                      <span className="passengers-info__name">{passenger.firstname} {passenger.lastname}</span>
                    </div>

                    <div className="about-price">
                      <span className="about-price__text">Luggage {passenger.luggageKg === 0 ? '' : ` - ${passenger.luggageKg} kg`}</span>
                      <span className="about-price__amount">$ {passenger.luggagePrice}</span>
                    </div>

                    <div className="about-price">
                      <span className="about-price__text">Seat - {passenger.selectedSeat}</span>
                      <span className="about-price__amount">included</span>
                    </div>
                  </div>
                ))}
              </section>

              <section className="order-details__total-price">
                <span className="total-price__text">Total</span>
                <span className="total-price__amount">$ {price * passengersAmount + getTicketPrice(passengersInfo)}</span>
              </section>
            </div>
          ))}
        </div>

        <button type="button" className="button" onClick={goToPaymentPage}>Confirm</button>
      </section>
    </>
  );
}

const mapStateToProps = state => ({
  requestInfo: state.user.requestInfo.request,
  selectedFlight: state.user.selectedFlight,
  returnSelectedFlight: state.user.returnSelectedFlight,
  paymentData: state.payment.paymentData,
});

const mapDispatchToProps = dispatch => ({
  fetchPaymentData: paymentObj => dispatch(fetchPaymentData(paymentObj)),
  setUserOrdersData: orders => dispatch(getUserOrders(orders)),
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(OrderDetails);
