import React from 'react';
// import { withRouter } from 'react-router';
// import { Form, Field } from "react-final-form";
import { connect } from 'react-redux';
import { compose } from 'redux';
import { flightPrice } from '../../redux/flights-list/actions';
// import { selectedFlightInfo, flightPrice } from '../../redux/flights-list/actions';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {styles} from './material.style';
import List from '@material-ui/core/List';
import moment from 'moment';

// import Search from '../search';

import {FlightsListItems} from './flights-list-items';
import './index.scss';

class FlightsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    }
  }

  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  onclick = () => {
    this.setState(state => {
      return {isOpen: !state.isOpen};
    });
  }

  render() {
    const { classes } = this.props;
    const { from, to, departure, adult, child, infant } = this.props.userRequest;
    const back = this.props.userRequest.return;

    return (
      <div className="flights-container">
        {from ? <div className="flights-list__header">
          <AppBar className={classes.root} position="fixed" color="default">
            <Toolbar>
              <div className="text-wrapper">
                <Typography variant="h6" color="inherit">
                  {from} to {to}
                </Typography>
                <Typography color="inherit">
                  departure {moment(departure).format('LL')}, {back && `return ${moment(back).format('LL')}`}, {adult && adult !== '0' && `adult ${adult}`} {child && child !== '0' && `child ${child}`} {infant && infant !== '0' && `infant ${infant}`}
                  <button className="change-button" onClick={this.onclick}>
                    Change
                  </button>
                </Typography>
              </div>
            </Toolbar>
          </AppBar>

          {/* {this.state.isOpen && <Search />} */}
    </div> 
        : <h1>Please, try to search flights</h1>}

        <List className="flights-list" disablePadding={true}>
          <FlightsListItems classes={classes} flights={this.props.tickets} setPrice={this.props.setPrice}/>
        </List>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userRequest: state.searchPage.user.request,
    tickets: state.searchPage.tickets.items,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setPrice: (price) => dispatch(flightPrice(price))
  };
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(FlightsList);
