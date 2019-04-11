import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import './index.scss';

const styles = theme => ({
  root: {
    backgroundColor: 'transparent',
    padding: '12px',
    paddingBottom: '30px',
  },
});

function HorizontalStepper(props) {
  HorizontalStepper.propTypes = {
    classes: PropTypes.object.isRequired,
    activeStep: PropTypes.number.isRequired,
    history: PropTypes.object.isRequired,
  };

  const { classes, activeStep } = props;

  return (
    <div>
      <Stepper className={classes.root} activeStep={activeStep} alternativeLabel>
        <Step>
          <StepLabel>Passengers</StepLabel>
        </Step>
        <Step>
          <StepLabel>Seats</StepLabel>
        </Step>
        <Step>
          <StepLabel>Order</StepLabel>
        </Step>
        <Step>
          <StepLabel>Payment</StepLabel>
        </Step>
        <Step>
          <StepLabel>Success</StepLabel>
        </Step>
      </Stepper>
    </div>
  );
}

export default compose(
  withRouter,
  withStyles(styles)
)(HorizontalStepper);
