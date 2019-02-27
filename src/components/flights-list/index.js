import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {styles} from './material.style';
import List from '@material-ui/core/List';

import {FlightsListItems} from './flights-list-items';
import './index.scss';

class FlightsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      from: 'Italia',
      to: 'Poland',
      type: 'return',
      passengers: '1 adult',
      selectedIndex: 1,
    }
  }

  render() {
    const { classes } = this.props;

    const flights = [
      {
        id: Math.random(),
        date: '16, FEB',
        startTime: '19.40',
        endTime: '22.30',
        price: '158'
      },
      {
        id: Math.random(),
        date: '16, FEB',
        startTime: '13.35',
        endTime: '17.40',
        price: '134'
      },
      {
        id: Math.random(),
        date: '16, FEB',
        startTime: '13.35',
        endTime: '17.40',
        price: '134'
      }
    ];

    return (
      <div className="flights-container">
        <div className="flights-list__header">
          <AppBar className={classes.root} position="fixed" color="default">
            <Toolbar>
              <div className="text-wrapper">
                <Typography variant="h6" color="inherit">
                  {this.state.from} to {this.state.to}
                </Typography>
                <Typography color="inherit">
                  {this.state.type}, {this.state.passengers}
                  <button className="change-button">
                    Change
                  </button>
                </Typography>
              </div>
            </Toolbar>
          </AppBar>
        </div>

        <List className="flights-list" disablePadding={true}>
          <FlightsListItems classes={classes} flights={flights} />
        </List>
      </div>
    );
  }
}

FlightsList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FlightsList);