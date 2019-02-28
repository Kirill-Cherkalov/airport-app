import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import { styles } from './material.style';
import './index.scss';

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

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes } = this.props;

    return (
      <form className="search-form-container" noValidate autoComplete="off">
        <div className="wrapper">
          <FormControl className={classes.formControl}>
            <InputLabel>From</InputLabel>
            <Select 
              value={this.state.from}
              onChange={this.handleChange}
              inputProps={{
                name: 'from'
              }}>
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={'BY'}>Belarus</MenuItem>
              <MenuItem value={'IT'}>Italia</MenuItem>
              <MenuItem value={'PL'}>Poland</MenuItem>
            </Select>
          </FormControl>

          <FormControl className={classes.formControl}>
            <InputLabel>To</InputLabel>
            <Select 
              value={this.state.to}
              onChange={this.handleChange}
              inputProps={{
                name: 'to'
              }}>
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={'BY'}>Belarus</MenuItem>
              <MenuItem value={'IT'}>Italia</MenuItem>
              <MenuItem value={'PL'}>Poland</MenuItem>
            </Select>
          </FormControl>
        </div>
        
        <div className="wrapper tablet">
          <div className="wrapper">
            <TextField
              id="depature-date"
              label="Departure"
              type="date"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              margin='dense'
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
            />
          </div>

          <div className="wrapper">
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
              />
            </Link>

            <Button variant="contained" color="primary" className={classes.button} type="submit">
              Search
            </Button>
          </div>
        </div>
      </form>
    );
  }
}

export default withStyles(styles)(Search);