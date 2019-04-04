import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { FaCcVisa, FaCcMastercard, FaRegCreditCard, FaUser, FaRegClock, FaUnlock } from 'react-icons/fa';
import { Form, Field } from 'react-final-form';
import validate from './validate';
import TextField from '../text-field';
import SimpleSelect from '../select';
import './index.scss';

function Payment({ history, userInfo }) {
  Payment.propTypes = {
    history: PropTypes.object.isRequired,
    userInfo: PropTypes.object.isRequired,
  };

  const onSubmit = (values) => {
    localStorage.setItem('payment', JSON.stringify(userInfo));
    const { from, to, departure, adult, child, infant } = userInfo.request;

    const userOrder = {
      userId: localStorage.getItem('id'),
      fromCountry: from,
      toCountry: to,
      departureDate: departure,
      passengersAmount: adult + child + infant,
      selectedFlight: userInfo.selectedFlight.id,
      passengersInfo: userInfo.passengersInfo,
    };

    fetch('http://localhost:3001/order', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(userOrder),
    });

    history.push('/payment-success');
  };

  const months = [{ _id: 1, name: 1 }, { _id: 2, name: 2 }, { _id: 3, name: 3 }, { _id: 4, name: 4 }, { _id: 5, name: 5 }, { _id: 6, name: 6 }, { _id: 7, name: 7 }, { _id: 8, name: 8 }, { _id: 9, name: 9 }, { _id: 10, name: 10 }, { _id: 11, name: 11 }, { _id: 12, name: 12 }];
  const years = [{ _id: 19, name: 19 }, { _id: 20, name: 20 }, { _id: 21, name: 21 }, { _id: 22, name: 22 }, { _id: 23, name: 23 }, { _id: 24, name: 24 }, { _id: 25, name: 25 }, { _id: 26, name: 26 }, { _id: 27, name: 27 }, { _id: 28, name: 28 }];

  const normalizeCardNumber = (value) => {
    if (!value) return value;
    const onlyNums = value.replace(/[^\d]/g, '');
    if (onlyNums.length <= 3) return onlyNums;
    if (onlyNums.length <= 7) return `${onlyNums.slice(0, 4)} ${onlyNums.slice(4, 8)}`;
    if (onlyNums.length <= 11) return `${onlyNums.slice(0, 4)} ${onlyNums.slice(4, 8)} ${onlyNums.slice(8, 12)}`;
    return `${onlyNums.slice(0, 4)} ${onlyNums.slice(4, 8)} ${onlyNums.slice(8, 12)} ${onlyNums.slice(12, 16)}`;
  };

  const normalizeCode = (value) => {
    if (!value) return value;
    const onlyNums = value.replace(/[^\d]/g, '');
    if (onlyNums.length <= 3) return onlyNums;
    return `${onlyNums.slice(0, 3)}`;
  };

  return (
    <section className="payment">
      <h1 className="payment__header">credit card</h1>
      <section className="payment__cards">
        <span className="payment__text">Accepted cards:</span>
        <FaCcVisa className="payment__cards_visa" />
        <FaCcMastercard className="payment__cards_mastercard" />
      </section>

      <Form
        onSubmit={onSubmit}
        validate={validate}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div className="payment-card">
              <div className="payment-card__field-wrapper">
                <FaRegCreditCard className="payment-card__icon" />
                <Field
                  name="number"
                  label="Card number"
                  type="text"
                  parse={normalizeCardNumber}
                  className="payment-card__field"
                  component={TextField}
                  variant="outlined"
                />
              </div>

              <div className="payment-card__field-wrapper">
                <FaUser className="payment-card__icon" />
                <Field
                  name="name"
                  label="Name on card"
                  className="payment-card__field"
                  component={TextField}
                  variant="outlined"
                />
              </div>

              <div className="wrapper">
                <div className="payment-card__field-wrapper">
                  <FaRegClock className="payment-card__icon" />
                  <Field
                    id="month"
                    name="month"
                    label="mm"
                    className="payment-card__date payment-card__date_month"
                    component={SimpleSelect}
                    items={months}
                  />
                  <Field
                    id="year"
                    name="year"
                    label="yy"
                    className="payment-card__date"
                    component={SimpleSelect}
                    items={years}
                  />
                </div>

                <div className="payment-card__field-wrapper">
                  <FaUnlock className="payment-card__lock-icon" />
                  <Field
                    name="code"
                    label="CVC/CVV"
                    type="password"
                    parse={normalizeCode}
                    className="payment-card__field payment-card__field_code"
                    component={TextField}
                    variant="outlined"
                  />
                </div>
              </div>
            </div>

            <button type="submit" className="button payment__button">Pay now</button>
          </form>
        )}
      />
    </section>
  );
}

const mapStateToProps = state => ({
  userInfo: state.user,
});

export default compose(
  withRouter,
  connect(mapStateToProps),
)(Payment);
