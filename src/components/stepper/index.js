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

  const { classes, activeStep, history } = props;

  return (
    <div>
      <Stepper className={classes.root} activeStep={activeStep} alternativeLabel>
        <Step onClick={activeStep <= 3 ? () => history.push('/passengers-list') : null}>
          <StepLabel>Passengers</StepLabel>
        </Step>
        <Step onClick={activeStep <= 3 ? () => history.push('/passengers-seats') : null}>
          <StepLabel>Seats</StepLabel>
        </Step>
        <Step onClick={(activeStep > 2 && activeStep <= 3) ? () => history.push('/order-details') : null}>
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
