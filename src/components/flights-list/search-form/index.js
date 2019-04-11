import React from 'react';
import PropTypes from 'prop-types';
import DateFnsUtils from '@date-io/date-fns';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';
import { Form, Field } from 'react-final-form';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import { airportsFetchData } from '../../../redux/search/airports/actions';
import { ticketsFetchData } from '../../../redux/search/tickets/actions';
import { Overlay } from '../../header/header-menu/sidebar';

import styles from './material.style';
import validate from '../../search/validate';
import DatePicker from '../../date-picker';
import SimpleSelect from '../../select';
import TextField from '../../text-field';
import './index.scss';

class SearchForm extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    airports: PropTypes.array.isRequired,
    ticketsFetchData: PropTypes.func.isRequired,
    airportsFetchData: PropTypes.func.isRequired,
    state: PropTypes.bool.isRequired,
    onSearchClick: PropTypes.func.isRequired,
  };

  componentDidMount() {
    return this.props.airports.length || this.props.airportsFetchData('http://localhost:3001/airports');
  }

  onSubmit = async (values) => {
    this.props.ticketsFetchData(values);
    this.props.onSearchClick();
  };

  render() {
    const { classes } = this.props;

    return (
      <>
        <Form
          onSubmit={this.onSubmit}
          validate={validate}
          render={({ handleSubmit }) => (
            <form className={`flights-list__search-form ${!this.props.state ? 'closed' : ''}`} onSubmit={handleSubmit}>
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

              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Field
                  name="return"
                  label="Return"
                  className={classes.textField}
                  component={DatePicker}
                  variant="outlined"
                />
              </MuiPickersUtilsProvider>

              <Field
                name="adult"
                label="Passengers"
                className={classes.passengers}
                component={TextField}
                variant="outlined"
              />

              <button type="submit" className="button">Search</button>
            </form>
          )}
        />
        <Overlay isOpen={this.props.state} />
      </>
    );
  }
}

const mapStateToProps = state => ({
  userRequest: state.user.request,
  tickets: state.searchPage.tickets.departureItems,
  ticketsHasErrored: state.searchPage.tickets.hasErrored,
  ticketsIsLoading: state.searchPage.tickets.isLoading,
  airports: state.searchPage.airports.items,
  airportsHaveErrored: state.searchPage.airports.hasErrored,
});

const mapDispatchToProps = dispatch => ({
  ticketsFetchData: (url, values) => dispatch(ticketsFetchData(url, values)),
  airportsFetchData: url => dispatch(airportsFetchData(url)),
});

export default compose(
  withRouter,
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(SearchForm);
