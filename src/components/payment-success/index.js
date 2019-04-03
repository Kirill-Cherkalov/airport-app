import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import './index.scss';

function PaymentSuccess({ history }) {
  PaymentSuccess.propTypes = {
    history: PropTypes.object.isRequired,
  };

  const goToStartPage = () => {
    history.push('/search');
  };

  return (
    <section className="payment-success">
      success
      <button type="button" className="button" onClick={goToStartPage}>go to START</button>
    </section>
  );
}

export default withRouter(PaymentSuccess);
