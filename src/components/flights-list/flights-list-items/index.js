import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import FlightLandIcon from '@material-ui/icons/FlightLand';
import './index.scss';

export function FlightsListItems({classes, flights}) {
  return (
    flights.map(({id, date, startTime, endTime, price}) => 
      <div key={id} className="flights-list-item">
        <div className="flights-list-item__info">
          <Typography variant="subtitle1" gutterBottom>
            {date}
          </Typography>
          <Typography variant="h4" gutterBottom>
            {startTime}
            <FlightTakeoffIcon className={classes.icon} fontSize="large"/>
            <FlightLandIcon className={classes.icon} fontSize="large"/>
            {endTime}
          </Typography>
        </div>
        <div className="flights-list-item__price">
          <Button variant="contained" color="primary" className={classes.button} type="submit">
            $ {price}
          </Button>
        </div>
      </div>
    )
  )
}