import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { setSelectedPassenger, setPassengersInfo } from '../../redux/user/selectedFlight/actions';
import { setReturnFlightSelectedPassenger, setReturnFlightPassengersInfo } from '../../redux/user/returnSelectedFlight/actions';
import PassengersSeatsTable from './passengers-seats-table';
import Plane from './plane';
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
  };

  goToNextPage = () => {
    this.props.history.push('/order-details');
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

    return (
      <div className="seats-choice-wrapper">
        <div className="seats-choice-container">
          {selectedFlight.id && (
            <div className="flight-seats">
              <PassengersSeatsTable
                flight={selectedFlight}
                passengersInfo={selectedFlight.passengersInfo}
                setSelectedPassenger={setSelectedPassenger}
                selectedPassenger={selectedFlight.selectedPassenger}
              />
              <Plane
                setInfo={setPassengersInfo}
                rows={selectedFlight.planeInfo.rows}
                location={selectedFlight.planeInfo.location}
                passengersInfo={selectedFlight.passengersInfo}
                selectedPassenger={selectedFlight.selectedPassenger}
                soldSeats={selectedFlight.soldSeats}
              />
            </div>
          )}

          {returnSelectedFlight.id && (
            <div className="flight-seats">
              <PassengersSeatsTable
                flight={returnSelectedFlight}
                passengersInfo={returnSelectedFlight.passengersInfo}
                setSelectedPassenger={setReturnFlightSelectedPassenger}
                selectedPassenger={returnSelectedFlight.selectedPassenger}
              />
              <Plane
                setInfo={setReturnFlightPassengersInfo}
                rows={returnSelectedFlight.planeInfo.rows}
                location={returnSelectedFlight.planeInfo.location}
                passengersInfo={returnSelectedFlight.passengersInfo}
                selectedPassenger={returnSelectedFlight.selectedPassenger}
                soldSeats={returnSelectedFlight.soldSeats}
              />
            </div>
          )}

        </div>
        <button type="button" className="button" onClick={this.goToNextPage}>Continue</button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  selectedFlight: state.user.selectedFlight,
  returnSelectedFlight: state.user.returnSelectedFlight,
});

const mapDispatchToProps = dispatch => ({
  setSelectedPassenger: id => dispatch(setSelectedPassenger(id)),
  setPassengersInfo: info => dispatch(setPassengersInfo(info)),
  setReturnFlightSelectedPassenger: id => dispatch(setReturnFlightSelectedPassenger(id)),
  setReturnFlightPassengersInfo: info => dispatch(setReturnFlightPassengersInfo(info)),
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(SeatsChoice);
