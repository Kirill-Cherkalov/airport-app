import React from 'react';
import { Form, Field } from "react-final-form";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import { styles } from './material.style';
import './index.scss';
import {airports} from '../../data/airport-array';
import {validate} from './validate';
import DatePicker from '../date-picker';
import SimpleSelect from '../select';
import TextField from '../text-field';

import {PassengersCounters} from '../passengers-counters';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      from: 'country',
      to: '',
      departure: new Date(),
      return: new Date(),
      countersIsShown: false
    }
  }

  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  onSubmit = async values => {
    const e = JSON.stringify(values);
    localStorage.setItem("search", e);
  };

  showCounters = () => {
    this.setState(state => {
      return {countersIsShown: !state.countersIsShown};
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <div className="search-form-container">
        <Form
          onSubmit={this.onSubmit}
          validate={validate}
          render={({ handleSubmit }) => (
            <form className="search-form">
              <Field
                name="from"
                label="From"
                className={classes.textField}
                component={SimpleSelect}
                airports={airports}
              >
              </Field>

              <Field
                name="to"
                label="To"
                className={classes.textField}
                component={SimpleSelect}
                airports={airports}
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

              <Field 
                name="passengers"
                label="Passengers"
                className={classes.textField}
                component={TextField}
                variant="outlined"
                onClick={this.showCounters}
              />
              <Button variant="contained" color="primary" className={classes.button} type="submit">
                Search
              </Button>
            </form>
          )}
        />
        <PassengersCounters isShown={this.state.countersIsShown} />
      </div>
    );
  }
}

export default withStyles(styles)(Search);