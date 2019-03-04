import React from 'react';
import { withRouter } from 'react-router';
import { Form, Field } from "react-final-form";
import { connect } from 'react-redux';
import { compose } from 'redux';
import { ticketsFetchData } from './actions/tickets';
import { airportsFetchData } from './actions/airports';


import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import { styles } from './material.style';
import './index.scss';
// import {airports} from '../../data/airport-array';
import {validate} from './validate';
import DatePicker from '../date-picker';
import SimpleSelect from '../select';
import TextField from '../text-field';

class Search extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  onSubmit = async values => {
    const e = JSON.stringify(values);
    localStorage.setItem("search", e);
  };

  clickfunc = (history) => {
    if (this.props.ticketsHasErrored) {
      return console.log('Sorry! There was an error loading the items');
    }

    if (this.props.ticketsIsLoading) {
      return console.log('Loading...');
    }
    
    if (this.props.tickets) {
      // const location = { path: '/flights-list' };
      return history.push('/flights-list');
    }
  }

  componentDidMount() {
    // this.props.ticketsFetchData('http://5826ed963900d612000138bd.mockapi.io/items');
    this.props.airportsFetchData('https://restcountries.eu/rest/v2/all?fields=name');
  }

  render() {
    const { history, classes } = this.props;

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

              {/* <Field
                name="to"
                label="To"
                className={classes.selectField}
                component={SimpleSelect}
                airports={this.props.airports}
              >
              </Field> */}

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

              <button onClick={() => history.push('/flights-list')}>button</button>
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
    tickets: state.tickets,
    ticketsHasErrored: state.ticketsHasErrored,
    ticketsIsLoading: state.ticketsIsLoading,
    airports: state.airports,
    airportsHaveErrored: state.airportsHaveErrored
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ticketsFetchData: (url) => dispatch(ticketsFetchData(url)),
    airportsFetchData: (url) => dispatch(airportsFetchData(url))
  };
};

// export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Search));
export default compose(
  withRouter,
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(Search);
