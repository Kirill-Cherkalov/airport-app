import React from 'react';
import { withRouter } from 'react-router';
import { Form, Field } from 'react-final-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import { airportsFetchData } from '../../redux/search/airports/actions';
import { ticketsFetchData } from '../../redux/search/tickets/actions';
import styles from './material.style';

import validate from './validate';
import DatePicker from '../date-picker';
import SimpleSelect from '../select';
import TextField from '../text-field';
import './index.scss';

class Search extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    airports: PropTypes.array.isRequired,
    ticketsFetchData: PropTypes.func.isRequired,
    airportsFetchData: PropTypes.func.isRequired,
    tickets: PropTypes.array.isRequired,
    returnTickets: PropTypes.array.isRequired,
    history: PropTypes.object.isRequired,
    userRequest: PropTypes.object.isRequired,
  };

  state = {
    oneWayType: true,
  };

  componentDidMount() {
    return this.props.airports.length || this.props.airportsFetchData('http://localhost:3001/airports');
  }

  componentDidUpdate = () => {
    const { twoWayRequest } = this.props.userRequest;
    return twoWayRequest
      ? this.props.tickets.length && this.props.returnTickets.length && this.props.history.push('/flights-list')
      : this.props.tickets.length && this.props.history.push('/flights-list');
  }

  onSubmit = values => this.props.ticketsFetchData(values);

  setWayType = () => this.setState(state => ({ oneWayType: !state.oneWayType }));

  render() {
    const { classes } = this.props;

    return (
      <div className="search-form-container">
        <Form
          onSubmit={this.onSubmit}
          validate={validate}
          render={({ handleSubmit }) => (
            <form className="search-form" onSubmit={handleSubmit}>
              <Field
                name="from"
                label="From"
                className={classes.selectField}
                component={SimpleSelect}
                items={this.props.airports}
              />

              <Field
                name="to"
                label="To"
                className={classes.selectField}
                component={SimpleSelect}
                items={this.props.airports}
              />

              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Field
                  name="departure"
                  label="Departure"
                  className={classes.textField}
                  component={DatePicker}
                  variant="outlined"
                />
              </MuiPickersUtilsProvider>

              <Field
                name="wayType"
                className="way-type"
                component="input"
                type="checkbox"
                variant="outlined"
                value="2"
                onClick={this.setWayType}
              />

              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Field
                  name="return"
                  label="Return"
                  className={classNames(classes.textField, {
                    [classes.hiddenTextField]: this.state.oneWayType,
                  })}
                  component={DatePicker}
                  variant="outlined"
                />
              </MuiPickersUtilsProvider>

              <div className="passengers-counters">
                <Field
                  name="adult"
                  label="Passengers"
                  className={classes.textField}
                  component={TextField}
                  variant="outlined"
                />
                {/* <Field
                  name="child"
                  label="Child"
                  className={classes.passengers}
                  component={TextField}
                  variant="outlined"
                />
                <Field
                  name="infant"
                  label="Infant"
                  className={classes.passengers}
                  component={TextField}
                  variant="outlined"
                /> */}
              </div>

              <Button variant="contained" color="primary" className={classes.button} type="submit">
                Search
              </Button>
            </form>
          )}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userRequest: state.user.requestInfo.request,
  tickets: state.searchPage.tickets.departureItems,
  returnTickets: state.searchPage.tickets.returnItems,
  ticketsHasErrored: state.searchPage.tickets.hasErrored,
  ticketsIsLoading: state.searchPage.tickets.isLoading,
  airports: state.searchPage.airports.items,
  airportsHaveErrored: state.searchPage.airports.hasErrored,
});

const mapDispatchToProps = dispatch => ({
  ticketsFetchData: request => dispatch(ticketsFetchData(request)),
  airportsFetchData: url => dispatch(airportsFetchData(url)),
});

export default compose(
  withRouter,
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(Search);
