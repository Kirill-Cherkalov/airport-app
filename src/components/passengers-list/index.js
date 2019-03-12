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

class PassengersList extends Component {
  static propTypes = {
    userRequest: PropTypes.object.isRequired,
    setPassengersInfo: PropTypes.func.isRequired,
  };

  onSubmit = values => {
    const history = this.props.history;
    this.props.setPassengersInfo(values);
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
});

const mapDispatchToProps = dispatch => ({
  setPassengersInfo: info => dispatch(setPassengersInfo(info)),
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(PassengersList);