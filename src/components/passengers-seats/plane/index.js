import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchPlaneLayout } from '../../../redux/user/actions';
import PlaneSeats from './plane-seats';
import SeatsSigns from './seats-signs';
import './index.scss';

class Plane extends React.Component {
  static propTypes = {
    rows: PropTypes.number.isRequired,
    location: PropTypes.array.isRequired,
    fetchPlaneLayout: PropTypes.func.isRequired,
    planeId: PropTypes.number.isRequired,
  };

  componentDidMount() {
    return this.props.fetchPlaneLayout(this.props.planeId);
  }

  render() {
    const signs = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];

    return (
      <div className="plane">
        {this.props.location && <SeatsSigns location={this.props.location} signs={signs} />}
        {this.props.location && <PlaneSeats rows={this.props.rows} location={this.props.location} signs={signs} />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  planeId: state.user.selectedFlight.planeId,
  rows: state.user.planeLayout.rows,
  location: state.user.planeLayout.location,
});

const mapDispatchToProps = dispatch => ({
  fetchPlaneLayout: planeId => dispatch(fetchPlaneLayout(planeId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Plane);
