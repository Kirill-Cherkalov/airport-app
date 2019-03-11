/* eslint-disable */
import React, { Component, Fragment } from 'react';
// import PropTypes from 'prop-types';
import ExpandablePanel from './expandable-panel';
import './index.scss';

export default class PassengersList extends Component {
  // Luggage.propTypes = {
  //   selectLuggage: PropTypes.func.isRequired,
  // };

  createItems = (type, amount) => {
    for (let i = 0; i < amount; i += 1) {
      return <ExpandablePanel key={Math.random()} type={type} />;
    }
  }

  render() {
    const passengers = [
      {
        type: 'adult',
        amount: 2,
      },
      {
        type: 'child',
        amount: 3,
      },
      {
        type: 'infant',
        amount: 3,
      },
    ];

    let i = 1;

    return (
      <div className="passengers-list">
        {passengers.map(({ type, amount }) => {
          const arr = new Array(amount).fill(amount);

          return (
            <Fragment key={Math.random()}>
              {arr.map(() => <ExpandablePanel key={Math.random()} type={type} index={i++} />)}
            </Fragment>
          );
        })}
      </div>
    );
  }
}
