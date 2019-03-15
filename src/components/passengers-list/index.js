/* eslint-disable */
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { FieldArray } from 'react-final-form-arrays';
import PropTypes from 'prop-types';
import ExpandablePanel from './expandable-panel';
import { setPassengersInfo } from '../../redux/user/actions';
import './index.scss';
import Details from './expandable-panel/details';
import Header from './expandable-panel/header';
import fetchPlaneSchema from '../../redux/data/plane-schema/actions';

class PassengersList extends Component {
  static propTypes = {
    userRequest: PropTypes.object.isRequired,
    setPassengersInfo: PropTypes.func.isRequired,
    fetchPlaneSchema: PropTypes.func.isRequired,
  };

  onSubmit = values => {
    const passengers = {};
    Object.keys(values).sort().forEach(function (key) {
      passengers[key] = values[key];
    });

    const sortablePassengers = [];

    for (let passenger in passengers) {
      sortablePassengers.push(passengers[passenger]);
    }

    const passengersArray = [];
    const passAmount = sortablePassengers.length/3;

    for (let i = 0; i < passAmount; i++) {
      const obj = {
        firstname: sortablePassengers[i],
        lastname: sortablePassengers[i+passAmount],
        luggagePrice: sortablePassengers[i+passAmount*2]
      }
      passengersArray.push(obj);
    }
    const history = this.props.history;
    this.props.setPassengersInfo(passengersArray);
    console.log(this.props.planeId);
    this.props.fetchPlaneSchema(this.props.planeId);
    return history.push('/passengers-seats');
  };

  render() {
    const { adult, child, infant } = this.props.userRequest;
    const passengersAmount = new Array((+adult || 0) + (+child || 0) + (+infant || 0)).fill(1);

    return (
      <Form
        onSubmit={this.onSubmit}
        mutators={{
          ...arrayMutators,
        }}
        render={({ handleSubmit },
          pristine, submitting) => (
            <form onSubmit={handleSubmit}>
              <FieldArray name="information">
                {() => (passengersAmount.map((elem, index) => (
                  // <ExpandablePanel key={Math.random()} index={index} />
                  <div className="expandable-panel" key={index}>
                    <Header index={index} />
                    <Details index={index} />
                  </div>
                )))}
              </FieldArray>
              <button type="submit" disabled={submitting || pristine}>
                Confirm
              </button>
            </form>
        )}
      />
    );
  }
}

const mapStateToProps = state => ({
  userRequest: state.user.request,
  planeId: state.user.selectedFlight.planeId,
});

const mapDispatchToProps = dispatch => ({
  setPassengersInfo: info => dispatch(setPassengersInfo(info)),
  fetchPlaneSchema: planeId => dispatch(fetchPlaneSchema(planeId)),
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(PassengersList);