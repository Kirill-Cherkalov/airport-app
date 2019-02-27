import React, { Component, Fragment } from 'react';
import TextField from '@material-ui/core/TextField';
import './index.scss';

import Avatar from '@material-ui/core/Avatar';
import WorkIcon from '@material-ui/icons/Work';

function Luggage({selectLuggage}) {
  return (
    <ul className="luggage-list">
      <li id={9} className="luggage-list__item" onClick={selectLuggage}>
        <Avatar>
          <WorkIcon />
        </Avatar>
        <div className="luggage-list__text"><span>10 kg</span><span>$ 9.00</span></div>
      </li>
      <li id={15} className="luggage-list__item" onClick={selectLuggage}>
        <Avatar>
          <WorkIcon />
        </Avatar>
        <div className="luggage-list__text"><span>20 kg</span><span>$ 15.00</span></div>
      </li>
      <li id={21} className="luggage-list__item" onClick={selectLuggage}>
        <Avatar>
          <WorkIcon />
        </Avatar>
        <div className="luggage-list__text"><span>30 kg</span><span>$ 21.00</span></div>
      </li>
      <li id={0} className="luggage-list__item" onClick={selectLuggage}>
        <Avatar>
          <WorkIcon />
        </Avatar>
        <div className="luggage-list__text">Free carry-on bag</div>
      </li>
    </ul>
  );
}

function Details({selectLuggage}) {
  return (
    <div className="expandable-panel-details">
      <div className="expandable-panel-details__names">
        <TextField
          label="First Name"
          className="textfield"
          margin="dense"
        />
        <TextField
          label="Last Name"
          className="textfield"
          margin="dense"
        />
      </div>
      <Luggage selectLuggage={selectLuggage}/>
    </div>
  );
}

function Header({isOpen, openPanel, type, index}) {
  return (
    <div className={isOpen ? "expandable-panel__header opened" : "expandable-panel__header"} onClick={openPanel}>{index} {type}</div>
  );
}

class ExpandablePanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      luggagePrice: null
    }
  }

  openPanel = () => {
    this.setState(state => {
      return {isOpen: !state.isOpen};
    });
  }

  selectLuggage = (event) => {
    this.setState({luggagePrice: +event.target.id});
  }

  render() {
    return (
      <div className="expandable-panel">
        <Header isOpen={this.state.isOpen} openPanel={this.openPanel} type={this.props.type} index={this.props.index}/>
        {this.state.isOpen && <div className="expandable-panel__details">
          <Details selectLuggage={this.selectLuggage}/>
        </div>}
      </div>
    );
  }
}

class PassengersList extends Component {
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

export default PassengersList;
