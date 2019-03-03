import React from 'react'
import ReactDOM from 'react-dom';

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from '@material-ui/core/OutlinedInput';

export default class SimpleSelect extends React.Component {
  state = {
    labelWidth: 0,
  };

  componentDidMount() {
    this.setState({
      labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
    });
  }

  render() {
    const {input: {name, onChange, value, ...restInput}, meta, ...rest} = this.props;

    return (
      <FormControl variant="outlined">
        <InputLabel
          ref={ref => {
            this.InputLabelRef = ref;
          }}
          htmlFor="outlined-age-simple"
        >
        {this.props.label}
        </InputLabel>
        <Select
          {...rest}
          // helperText={meta.touched ? meta.error : undefined}
          error={meta.error && meta.touched}
          inputProps={restInput}
          value={value}
          onChange={onChange}
          input={
            <OutlinedInput
              labelWidth={this.state.labelWidth}
              name={name}
              id="outlined-age-simple"
            />
          }
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem >
          {this.props.airports.map(airport =>
            <MenuItem key={Math.random()} value={airport}>{airport}</MenuItem>
          )}
        </Select>
      </FormControl>
    );
  }
}
