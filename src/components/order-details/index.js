import React from 'react';
import moment from 'moment';
import { FaCheck, FaRegUserCircle } from 'react-icons/fa';
import './index.scss';

const userInfo = {
  request: {
    from: 'Abakan',
    to: 'Mala Mala',
    departure: '2019-03-29T13:08:01.677Z',
    adult: '2',
  },
  selectedFlight: {
    date: '2019-03-29T00:00:00.000Z',
    startTime: '16.20',
    endTime: '18.45',
    price: 95,
    planeInfo: {
      seatsInRow: [],
      _id: '5c98b764fb304d68a0b2cd5a',
      location: [
        'A',
        'B',
        '',
        'C',
        '',
        'D',
        'E',
      ],
      code: '1',
      rows: 10,
      __v: 0,
    },
  },
  totalPrice: 95,
  passengersInfo: [
    {
      firstname: 'Ivan',
      lastname: 'Ivanov',
      luggagePrice: '15',
      selectedSeat: '2B',
      seatPrice: 9,
    },
    {
      firstname: 'Petr',
      lastname: 'Petrov',
      luggagePrice: '21',
      selectedSeat: '2A',
      seatPrice: 9,
    },
  ],
  selectedPassenger: 1,
};
const { adult, child, infant } = userInfo.request;
const passAmount = +adult || 0 + +child || 0 + +infant || 0;
const flightPrice = passAmount * userInfo.selectedFlight.price;
let luggageprice = 0;
userInfo.passengersInfo.map(({ luggagePrice }) => {
  luggageprice += +luggagePrice;
  return luggageprice;
});

const totalPrice = flightPrice + luggageprice;

function OrderDetails() {
  return (
    <section className="order-details">

      <section className="order-details__flight">
        <div className="order-details__header">
          <FaCheck className="order-details__icon" />
          <span className="order-details__text">Flight</span>
        </div>

        <div className="flight-info">
          <div className="flight-info__wrapper">
            <span className="flight-info__direction">{userInfo.request.from} - {userInfo.request.to}</span>
            <span className="flight-info__time">{userInfo.selectedFlight.startTime} - {userInfo.selectedFlight.endTime}</span>
          </div>
          <span className="flight-info__date">{moment(userInfo.selectedFlight.date).format('MMM Do')}</span>
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

        {userInfo.passengersInfo.map(passenger => (
          <div className="passengers-info">
            <div className="passengers-info__about">
              <FaRegUserCircle className="passengers-info__icon" />
              <span className="passengers-info__name">{passenger.firstname} {passenger.lastname}</span>
            </div>

            <div className="about-price">
              <span className="about-price__text">Luggage</span>
              <span className="about-price__amount">{passenger.luggagePrice}</span>
            </div>

            <div className="about-price">
              <span className="about-price__text">Seat - {passenger.selectedSeat}</span>
              <span className="about-price__amount">$ {passenger.seatPrice}</span>
            </div>
          </div>
        ))}
      </section>

      <section className="order-details__total-price">
        <span className="total-price__text">Total price</span>
        <span className="total-price__amount">{totalPrice}</span>
      </section>

      <button type="button" className="button">Confirm</button>
    </section>
  );
}

export default OrderDetails;
