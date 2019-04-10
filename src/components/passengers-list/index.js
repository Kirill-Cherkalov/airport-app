import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { FieldArray } from 'react-final-form-arrays';
import PropTypes from 'prop-types';
import { setPassengersInfo } from '../../redux/user/selectedFlight/actions';
import { setReturnFlightPassengersInfo } from '../../redux/user/returnSelectedFlight/actions';
import './index.scss';
import Details from './expandable-panel/details';
import Header from './expandable-panel/header';
import { resetTicketsInfo } from '../../redux/search/tickets/actions';

class PassengersList extends Component {
  static propTypes = {
    userRequest: PropTypes.object.isRequired,
    luggageTypes: PropTypes.array.isRequired,
    setPassengersInfo: PropTypes.func.isRequired,
    setReturnFlightPassengersInfo: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
  };

  onSubmit = (values) => {
    const passengers = Object.keys(values).sort().map(key => values[key]);

    const passengersArray = [];
    const passAmount = passengers.length / 3;

    for (let i = 0; i < passAmount; i++) {
      const obj = {
        firstname: passengers[i],
        lastname: passengers[i + passAmount],
        luggagePrice: passengers[i + passAmount * 2],
      };
      passengersArray.push(obj);
    }

    const { history } = this.props;
    passengersArray.map(passenger => this.props.luggageTypes.filter((type) => {
      if (type.price === +passenger.luggagePrice) {
        passenger.luggagePrice = type.price;
        passenger.luggageKg = type.kg;
      }
    }));
    this.props.setPassengersInfo(passengersArray);
    this.props.setReturnFlightPassengersInfo(passengersArray);
    return history.push('/passengers-seats');
  };

  render() {
    const { adult, child, infant } = this.props.userRequest;
    const passengersAmount = new Array(adult + child + infant).fill(1);

    return (
      <Form
        onSubmit={this.onSubmit}
        mutators={{
          ...arrayMutators,
        }}
        render={({ handleSubmit },
          pristine, submitting) => (
            <form
              onSubmit={handleSubmit}
              className="passengers-list-form"
            >
              <FieldArray name="information">
                {() => (passengersAmount.map((elem, index) => (
                  <div className="expandable-panel" key={index}>
                    <Header index={index} />
                    <Details index={index} />
                  </div>
                )))}
              </FieldArray>

              <button
                type="submit"
                className="button"
                disabled={submitting || pristine}
              >
                Confirm
              </button>
            </form>
        )}
      />
    );
  }
}

const mapStateToProps = state => ({
  userRequest: state.user.requestInfo.request,
  luggageTypes: state.data.luggage.luggageTypes,
});

const mapDispatchToProps = dispatch => ({
  setPassengersInfo: info => dispatch(setPassengersInfo(info)),
  setReturnFlightPassengersInfo: info => dispatch(setReturnFlightPassengersInfo(info)),
  resetTicketsInfo: () => dispatch(resetTicketsInfo()),
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(PassengersList);
