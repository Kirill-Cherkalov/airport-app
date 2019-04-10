import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchUserOrdersData } from '../../redux/user/orders/actions';
import ListItem from './list-item/index';
import './index.scss';

class OrdersHistory extends React.Component {
  static propTypes = {
    fetchUserOrdersData: PropTypes.func.isRequired,
    userOrders: PropTypes.array.isRequired,
  };

  componentDidMount = () => this.props.fetchUserOrdersData(new Date(), 'future');

  getPastOrders = () => this.props.fetchUserOrdersData(new Date(), 'past');

  getFutureOrders = () => this.props.fetchUserOrdersData(new Date(), 'future');

  render() {
    return (
      <section className="orders-history">
        <div className="orders-history__filter-buttons">
          <button
            type="button"
            className="button orders-history__filter-button"
            onClick={this.getFutureOrders}
          >
            Future
          </button>
          <button
            type="button"
            className="button orders-history__filter-button"
            onClick={this.getPastOrders}
          >
            Past
          </button>
        </div>

        <ul className="orders-history__list">
          {this.props.userOrders.length && this.props.userOrders.map((order, index) => (
            <ListItem order={order} key={index} />
          ))}
        </ul>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  userOrders: state.user.ordersInfo.orders,
});

const mapDispatchToProps = dispatch => ({
  fetchUserOrdersData: (date, type) => dispatch(fetchUserOrdersData(date, type)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrdersHistory);
