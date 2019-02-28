import React, { Component, Fragment } from 'react';
import {ExpandablePanel} from './expandable-panel';
import './index.scss';

export class PassengersList extends Component {
  createItems = (type, amount) => {
    for (let i = 0; i < amount; i++) {
      return <ExpandablePanel key={Math.random()} type={type} />
    }
  }

  render() {
    const passengers = [
      {
        type: 'adult',
        amount: 2
      },
      {
        type: 'child',
        amount: 3
      },
      {
        type: 'infant',
        amount: 3
      }
    ];

    let i = 1;

    return (
      <div className="passengers-list">
        {passengers.map(({type, amount}) => {
          const arr = new Array(amount).fill(amount);

          return <Fragment key={Math.random()}>
            {arr.map(() => {
              return <ExpandablePanel key={Math.random()} type={type} index={i++}/>
            })}
          </Fragment>
        })}
      </div>
    );
  }
}
