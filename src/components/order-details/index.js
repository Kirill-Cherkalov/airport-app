import React from 'react';
import { FaCheck } from 'react-icons/fa';
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
    },
    {
      firstname: 'Petr',
      lastname: 'Petrov',
      luggagePrice: '21',
      selectedSeat: '2A',
    },
  ],
  selectedPassenger: 1,
};

function OrderDetails() {
  return (
    <section className="order-details">
      <section className="order-details__flight-info">
        <div className="order-details__info-header">
          <FaCheck className="info-header__icon" />
          <span className="info-header__text">Flight</span>
        </div>
      </section>

      <section className="order-details__passengers-info">
        <div className="order-details__info-header">
          <FaCheck className="info-header__icon" />
          <span className="info-header__text">Passengers</span>
        </div>
      </section>

      <section className="order-details__total-price" />

      <button type="button">Confirm</button>
    </section>
  );
}

export default OrderDetails;
