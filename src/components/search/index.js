import React from 'react';
import { withRouter } from 'react-router';
import { Form, Field } from "react-final-form";
import { connect } from 'react-redux';
import { compose } from 'redux';
import { ticketsFetchData } from '../../redux/search/tickets/actions';
import { airportsFetchData } from '../../redux/search/airports/actions';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import { styles } from './material.style';
import './index.scss';

import {validate} from './validate';
import DatePicker from '../date-picker';
import SimpleSelect from '../select';
import TextField from '../text-field';

class Search extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  onSubmit = async values => {
    const {history} = this.props;
    this.props.ticketsFetchData('/search-request', values);
    if (this.props.tickets) {
      return history.push('/flights-list');
    }
  };

  componentDidMount() {
    this.props.airports.length || this.props.airportsFetchData('/airports');
  }

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
              >
              </Field>

              <Field
                name="to"
                label="To"
                className={classes.selectField}
                component={SimpleSelect}
                items={this.props.airports}
              >
              </Field>

              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Field
                  name="departure"
                  label="Departure"
                  className={classes.textField}
                  component={DatePicker}
                  variant='outlined'
                />
              </MuiPickersUtilsProvider>

              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Field
                  name="return"
                  label="Return"
                  className={classes.textField}
                  component={DatePicker}
                  variant='outlined'
                />
              </MuiPickersUtilsProvider>

              <div className='passengers-counters'>
                <Field 
                  name="adult"
                  label="Adult"
                  className={classes.passengers}
                  component={TextField}
                  variant="outlined"
                />
                <Field 
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
                />
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

const mapStateToProps = (state) => {
  return {
    userRequest: state.user.request,
    tickets: state.tickets.items,
    ticketsHasErrored: state.tickets.hasErrored,
    ticketsIsLoading: state.tickets.isLoading,
    airports: state.airports.items,
    airportsHaveErrored: state.airports.hasErrored
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ticketsFetchData: (url, values) => dispatch(ticketsFetchData(url, values)),
    airportsFetchData: (url) => dispatch(airportsFetchData(url))
  };
};

export default compose(
  withRouter,
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(Search);
