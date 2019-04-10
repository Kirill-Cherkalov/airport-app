import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import './index.scss';

class ListItem extends React.Component {
  static propTypes = {
    order: PropTypes.object.isRequired,
  };

  state = {
    isOpened: false,
  }

  toggleDetails = () => this.setState(state => ({ isOpened: !state.isOpened }));

  render() {
    const { order } = this.props;
    return (
      <li className="list-item">
        <div className="list-item__header" onClick={this.toggleDetails}>
          <div className="list-item__header-wrapper">
            <span className="list-item__destination">{order.fromCountry} - {order.toCountry}</span>
            <div className="list-item__departure">
              <span className="list-item__departure_date">{moment(order.departureDate).format('LL')}</span>
              <span className="list-item__departure_time">{order.startTime} - {order.endTime}</span>
            </div>
          </div>
        </div>

        {this.state.isOpened && (
          <div className="list-item__details">
            <table className="list-item__table">
              <tbody>
                <tr className="list-item__table-row list-item__table-row_head">
                  <th className="list-item__table-th">#</th>
                  <th className="list-item__table-th">passenger name</th>
                  <th className="list-item__table-th">luggage</th>
                  <th className="list-item__table-th">seat</th>
                </tr>
                {order.passengersInfo.map(({ firstname, lastname, luggageKg, selectedSeat }, index) => (
                  <tr className="list-item__table-row" key={luggageKg + index}>
                    <td className="list-item__table-td">{index + 1}</td>
                    <td className="list-item__table-td">{firstname} {lastname}</td>
                    <td className="list-item__table-td">{luggageKg} kg</td>
                    <td className="list-item__table-td">{selectedSeat}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </li>
    );
  }
}

export default ListItem;
