import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { setSelectedPassenger, setPassengersInfo } from '../../redux/user/selectedFlight/actions';
import { setReturnFlightSelectedPassenger, setReturnFlightPassengersInfo } from '../../redux/user/returnSelectedFlight/actions';
import { enqueueSnackbar } from '../../redux/notifier/actions';
import PassengersSeatsTable from './passengers-seats-table';
import Plane from './plane';
import HorizontalStepper from '../stepper';
import './index.scss';

class SeatsChoice extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    selectedFlight: PropTypes.object.isRequired,
    returnSelectedFlight: PropTypes.object.isRequired,
    setSelectedPassenger: PropTypes.func.isRequired,
    setPassengersInfo: PropTypes.func.isRequired,
    setReturnFlightSelectedPassenger: PropTypes.func.isRequired,
    setReturnFlightPassengersInfo: PropTypes.func.isRequired,
    twoWayRequest: PropTypes.bool.isRequired,
  };

  state = {
    currentFlightId: this.props.selectedFlight.id,
  };

  goToNextPage = () => {
    if (this.state.currentFlightId === this.props.selectedFlight.id) {
      const allSeatAreSelected = this.props.selectedFlight.passengersInfo.some(({ selectedSeat }) => selectedSeat === undefined);
      // this.props.enqueueSnackBar({
      //   message: 'Select seats',
      //   options: {
      //     variant: 'warning',
      //   },
      // });

      if (!allSeatAreSelected) {
        return this.props.twoWayRequest
          ? this.setState({ currentFlightId: this.props.returnSelectedFlight.id })
          : this.props.history.push('/order-details');
      }
    } else {
      const allSeatAreSelected = this.props.returnSelectedFlight.passengersInfo.some(({ selectedSeat }) => selectedSeat === undefined);
      return !allSeatAreSelected && this.props.history.push('/order-details');
    }
  };

  render() {
    const {
      selectedFlight,
      returnSelectedFlight,
      setSelectedPassenger,
      setPassengersInfo,
      setReturnFlightSelectedPassenger,
      setReturnFlightPassengersInfo,
    } = this.props;

    console.log(selectedFlight);

    return (
      <>
        <HorizontalStepper activeStep={1} />
        <div className="seats-choice-wrapper">
          <div className="seats-choice-container">
            <div className={`flight-seats${this.state.currentFlightId === selectedFlight.id ? '' : ' closed-block'}`}>
              <PassengersSeatsTable
                flight={selectedFlight}
                passengersInfo={selectedFlight.passengersInfo}
                setSelectedPassenger={setSelectedPassenger}
                selectedPassenger={selectedFlight.selectedPassenger}
              />
              <Plane
                setInfo={setPassengersInfo}
                rows={selectedFlight.planeInfo.rowsNumber}
                location={selectedFlight.planeInfo.seatsInRow}
                passengersInfo={selectedFlight.passengersInfo}
                selectedPassenger={selectedFlight.selectedPassenger}
                soldSeats={selectedFlight.soldSeats}
              />
            </div>

            {returnSelectedFlight.id && (
              <div className={`flight-seats${this.state.currentFlightId === returnSelectedFlight.id ? '' : ' closed-block'}`}>
                <PassengersSeatsTable
                  flight={returnSelectedFlight}
                  passengersInfo={returnSelectedFlight.passengersInfo}
                  setSelectedPassenger={setReturnFlightSelectedPassenger}
                  selectedPassenger={returnSelectedFlight.selectedPassenger}
                />
                <Plane
                  setInfo={setReturnFlightPassengersInfo}
                  rows={returnSelectedFlight.planeInfo.rowsNumber}
                  location={returnSelectedFlight.planeInfo.seatsInRow}
                  passengersInfo={returnSelectedFlight.passengersInfo}
                  selectedPassenger={returnSelectedFlight.selectedPassenger}
                  soldSeats={returnSelectedFlight.soldSeats}
                />
              </div>
            )}

          </div>
          <button type="button" className="button" onClick={this.goToNextPage}>Continue</button>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  twoWayRequest: state.user.requestInfo.request.twoWayRequest,
  selectedFlight: state.user.selectedFlight,
  returnSelectedFlight: state.user.returnSelectedFlight,
});

const mapDispatchToProps = dispatch => ({
  setSelectedPassenger: id => dispatch(setSelectedPassenger(id)),
  setPassengersInfo: info => dispatch(setPassengersInfo(info)),
  setReturnFlightSelectedPassenger: id => dispatch(setReturnFlightSelectedPassenger(id)),
  setReturnFlightPassengersInfo: info => dispatch(setReturnFlightPassengersInfo(info)),
  enqueueSnackBar: obj => dispatch(enqueueSnackbar(obj)),
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(SeatsChoice);
