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
import { enqueueSnackbar } from '../../redux/notifier/actions';
import SearchForm from './search-form';
import FlightsListItems from './flights-list-items';
import './index.scss';

class FlightsList extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    tickets: PropTypes.array.isRequired,
    returnTickets: PropTypes.array.isRequired,
    setSelectedFlightInfo: PropTypes.func.isRequired,
    setReturnSelectedFlightInfo: PropTypes.func.isRequired,
    selectedFlight: PropTypes.object.isRequired,
    returnSelectedFlight: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    enqueueSnackBar: PropTypes.func.isRequired,
    twoWayRequest: PropTypes.bool.isRequired,
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
    if (this.props.twoWayRequest && this.props.selectedFlight.id && this.props.returnSelectedFlight.id) {
      return this.props.history.push('/passengers-list');
    }
    if (!this.props.twoWayRequest && this.props.selectedFlight.id) {
      return this.props.history.push('/passengers-list');
    }

    return this.props.enqueueSnackBar({
      message: 'Choose flight',
      options: {
        variant: 'warning',
      },
    });
  };

  getPassAmount = (adult, child, infant) => {
    const passengers = adult + child + infant;
    const str = passengers > 1
      ? `${passengers} passengers`
      : `${passengers} passenger`;
    return str;
  }

  render() {
    const { classes, tickets, returnTickets, twoWayRequest } = this.props;
    const {
      from, to, adult, child, infant, departure, back,
    } = this.props;
    const departureDate = moment(departure).format('MMMM DD');
    const backDate = moment(back).format('MMMM DD');

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
                    {departureDate}{backDate && ' - ' }{back && backDate}, {this.getPassAmount(adult, child, infant)}
                    <button className="change-button" type="button" onClick={this.openSearchForm}>
                      Change
                    </button>
                  </Typography>
                </div>
              </Toolbar>
            </AppBar>

            <SearchForm state={this.state.isOpen} onSearchClick={this.openSearchForm} />
          </div>
        )
          : <h1 className="flights-list__header">Please, try to search flights</h1>}

        <>
          {tickets[0] && <h1 className="flights-list__header"><pre>{from} - {to}   |   {moment(departure).format('MMMM DD')}</pre></h1>}
          <List className="flights-list" disablePadding>
            <FlightsListItems
              classes={classes}
              flights={this.props.tickets}
              setFlightInfo={this.props.setSelectedFlightInfo}
            />
          </List>
          {twoWayRequest && returnTickets[0] && <h1 className="flights-list__header"><pre>{to} - {from}   |   {backDate}</pre></h1>}
          <List className="flights-list" disablePadding>
            <FlightsListItems
              classes={classes}
              flights={this.props.returnTickets}
              setFlightInfo={this.props.setReturnSelectedFlightInfo}
            />
          </List>
        </>
        {tickets[0] && <button type="button" className="button" onClick={this.goToNextPage}>Continue</button>}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  twoWayRequest: state.user.requestInfo.request.twoWayRequest,
  from: state.user.requestInfo.request.from,
  to: state.user.requestInfo.request.to,
  adult: state.user.requestInfo.request.adult,
  child: state.user.requestInfo.request.child,
  infant: state.user.requestInfo.request.infant,
  departure: state.user.requestInfo.request.departure,
  back: state.user.requestInfo.request.return,
  tickets: state.searchPage.tickets.departureItems,
  returnTickets: state.searchPage.tickets.returnItems,
  selectedFlight: state.user.selectedFlight,
  returnSelectedFlight: state.user.returnSelectedFlight,
});

const mapDispatchToProps = dispatch => ({
  setSelectedFlightInfo: flightInfo => dispatch(setSelectedFlightInfo(flightInfo)),
  setReturnSelectedFlightInfo: flightInfo => dispatch(setReturnSelectedFlightInfo(flightInfo)),
  enqueueSnackBar: obj => dispatch(enqueueSnackbar(obj)),
});

export default compose(
  withRouter,
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(FlightsList);
