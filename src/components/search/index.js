import React from 'react';
import {Link} from 'react-router-dom';
// import { Form, Field } from "react-final-form";
// import { Select } from 'final-form-material-ui';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
// import TextField from '../text-field';
import TextField from '@material-ui/core/TextField';
import { styles } from './material.style';
import './index.scss';

// import {validate} from '../../form-validation/register-form';
import {countries} from '../../data/airport-array';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      from: '',
      to: ''
    }
  }

  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  onSubmit = async values => {
    const e = JSON.stringify(values);
    localStorage.setItem("search", e);
  };

  render() {
    const { classes } = this.props;

    return (
      <div className="search-form-container">
        {/* <Form
          onSubmit={this.onSubmit}
          validate={validate}
          render={({ handleSubmit }) => ( */}
            <form className="search-form" noValidate autoComplete="on">
              <TextField
                id="from-country"
                label="From"
                select
                placeholder="Country"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                margin='dense'
                variant="outlined"
                onChange={this.handleChange('from')}
                value={this.state.from}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {countries.map(country =>
                  <MenuItem key={Math.random()} value={country}>
                    {country}
                  </MenuItem>
                )}
              </TextField>

              <TextField
                id="to-country"
                label="To"
                select
                placeholder="Country"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                margin='dense'
                variant="outlined"
                onChange={this.handleChange('to')}
                value={this.state.to}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {countries.map(country =>
                  <MenuItem key={Math.random()} value={country}>
                    {country}
                  </MenuItem>
                )}
              </TextField>
              
              <TextField
                id="depature-date"
                label="Departure"
                type="date"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                margin='dense'
                variant="outlined"
              />
              <TextField
                id="return-date"
                label="Return"
                type="date"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                margin='dense'
                variant="outlined"
              />

              <Link to='/passengers-counters'>
                <TextField
                  id="passengers"
                  label="Passengers"
                  type="text"
                  placeholder="1 adult"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  margin='dense'
                  variant="outlined"
                />
              </Link>

              <Button variant="contained" color="primary" className={classes.button} type="submit">
                Search
              </Button>
            </form>
          {/* )}
        /> */}
      </div>
    );
  }
}

export default withStyles(styles)(Search);