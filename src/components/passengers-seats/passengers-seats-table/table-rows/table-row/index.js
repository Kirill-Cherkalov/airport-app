/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

export default class TableRow extends React.Component {
  static propTypes = {
    index: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      seat: 'seat',
    };
  }

  changeSeat = () => {
    this.setState({ seat: this.state.seat === 'seat' ? '6b' : 'seat' });
  }

  render() {
    return (
      <tr className="passengers-seats__passenger">
        <td className="passengers-seats__info td">{this.props.index} {this.props.type}</td>
        <td className="passengers-seats__seat td" onClick={this.changeSeat}>{this.state.seat}</td>
      </tr>
    );
  }
}
