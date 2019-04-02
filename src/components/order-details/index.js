import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import moment from 'moment';
import { FaCheck, FaRegUserCircle } from 'react-icons/fa';
import './index.scss';

function OrderDetails({ userInfo, history }) {
  OrderDetails.propTypes = {
    userInfo: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };

  const { adult, child, infant } = userInfo.request;
  const passAmount = +adult || 0 + +child || 0 + +infant || 0;
  const flightPrice = passAmount * userInfo.selectedFlight.price;
  const allLuggagePrice = userInfo.passengersInfo.reduce((total, { luggagePrice: price }) => total + price, 0);
  const totalPrice = flightPrice + allLuggagePrice;

  const onClick = () => history.push('/payment');

  return (
    <section className="order-details">

      <section className="order-details__flight">
        <div className="order-details__header">
          <FaCheck className="order-details__icon" />
          <span className="order-details__text">Flight</span>
        </div>

        <div className="flight-info">
          <span className="flight-info__date">{moment(userInfo.selectedFlight.date).format('MMM Do')}</span>
          <div className="flight-info__wrapper">
            <span className="flight-info__direction">{userInfo.request.from} - {userInfo.request.to}</span>
            <span className="flight-info__time">{userInfo.selectedFlight.startTime} - {userInfo.selectedFlight.endTime}</span>
          </div>
        </div>

        <div className="about-price">
          <span className="about-price__text">{passAmount} x Flight ticket</span>
          <span className="about-price__amount">$ {flightPrice}</span>
        </div>
      </section>

      <section className="order-details__passengers">
        <div className="order-details__header">
          <FaCheck className="order-details__icon" />
          <span className="order-details__text">Passengers</span>
        </div>

        {userInfo.passengersInfo.map((passenger, index) => (
          <div className="passengers-info" key={index}>
            <div className="passengers-info__about">
              <FaRegUserCircle className="passengers-info__icon" />
              <span className="passengers-info__name">{passenger.firstname} {passenger.lastname}</span>
            </div>

            <div className="about-price">
              <span className="about-price__text">Luggage - {passenger.luggageKg} kg</span>
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
        <span className="total-price__amount">$ {totalPrice}</span>
      </section>

      <button type="button" className="button" onClick={onClick}>Confirm</button>
    </section>
  );
}

const mapStateToProps = state => ({
  userInfo: state.user,
});

export default compose(
  withRouter,
  connect(mapStateToProps),
)(OrderDetails);
