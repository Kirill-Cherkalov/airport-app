import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { compose } from 'redux';
import moment from 'moment';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import styles from './material.style';
import { setSelectedFlightInfo } from '../../redux/user/selectedFlight/actions';
import { setReturnSelectedFlightInfo } from '../../redux/user/returnSelectedFlight/actions';
import SearchForm from './search-form/search-form';
import FlightsListItems from './flights-list-items';
import './index.scss';

class FlightsList extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    userRequest: PropTypes.object.isRequired,
    tickets: PropTypes.array.isRequired,
    returnTickets: PropTypes.array.isRequired,
    setSelectedFlightInfo: PropTypes.func.isRequired,
    setReturnSelectedFlightInfo: PropTypes.func.isRequired,
    selectedFlight: PropTypes.object.isRequired,
    returnSelectedFlight: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  openSearchForm = () => {
    this.setState(state => ({ isOpen: !state.isOpen }));
  }

  goToNextPage = () => {
    if (this.props.userRequest.twoWayRequest && this.props.selectedFlight.id && this.props.returnSelectedFlight.id) {
      return this.props.history.push('/passengers-list');
    }

    return (!this.props.userRequest.twoWayRequest && this.props.selectedFlight.id && this.props.history.push('/passengers-list'));
  };

  getPassAmount = (adult, child, infant) => {
    const passengers = adult + child + infant;
    const str = passengers > 1
      ? `${passengers} passengers`
      : `${passengers} passenger`;
    return str;
  }

  render() {
    const { classes } = this.props;
    const {
      from, to, adult, child, infant,
    } = this.props.userRequest;
    const departure = moment(this.props.userRequest.departure).format('LL');
    const back = moment(this.props.userRequest.return).format('LL');

    return (
      <div className="flights-container">
        {from ? (
          <div className="flights-list__bar">
            <AppBar className={classes.root} position="fixed" color="default">
              <Toolbar>
                <div className="text-wrapper">
                  <Typography variant="h6" color="inherit">
                    {from} to {to}
                  </Typography>
                  <Typography color="inherit">
                    {departure}{back && ' - ' }{back && back}, {this.getPassAmount(adult, child, infant)}
                    <button className="change-button" type="button" onClick={this.openSearchForm}>
                    Change
                    </button>
                  </Typography>
                </div>
              </Toolbar>
            </AppBar>

            {this.state.isOpen && <SearchForm />}
          </div>
        )
          : <h1 className="flights-list__header">Please, try to search flights</h1>}

        <>
          {this.props.tickets[0]
            ? <h1 className="flights-list__header"><pre>{from} - {to}   |   {departure}</pre></h1>
            : <h1 className="flights-list__header">No flights for this request</h1>
          }
          <List className="flights-list" disablePadding>
            <FlightsListItems
              classes={classes}
              flights={this.props.tickets}
              setFlightInfo={this.props.setSelectedFlightInfo}
            />
          </List>

          {this.props.userRequest.twoWayRequest && this.props.returnTickets[0] && <h1 className="flights-list__header"><pre>{to} - {from}   |   {back}</pre></h1>}
          <List className="flights-list" disablePadding>
            <FlightsListItems
              classes={classes}
              flights={this.props.returnTickets}
              setFlightInfo={this.props.setReturnSelectedFlightInfo}
            />
          </List>
        </>

        <button type="button" className="flights-list-button button" onClick={this.goToNextPage}>Continue</button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userRequest: state.user.requestInfo.request,
  tickets: state.searchPage.tickets.departureItems,
  returnTickets: state.searchPage.tickets.returnItems,
  selectedFlight: state.user.selectedFlight,
  returnSelectedFlight: state.user.returnSelectedFlight,
});

const mapDispatchToProps = dispatch => ({
  setSelectedFlightInfo: flightInfo => dispatch(setSelectedFlightInfo(flightInfo)),
  setReturnSelectedFlightInfo: flightInfo => dispatch(setReturnSelectedFlightInfo(flightInfo)),
});

export default compose(
  withRouter,
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(FlightsList);
