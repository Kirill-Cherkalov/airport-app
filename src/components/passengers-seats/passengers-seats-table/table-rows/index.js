import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TableRow from './table-row';
import './index.scss';

function TableRows({ passengersInfo }) {
  TableRows.propTypes = {
    passengersInfo: PropTypes.array.isRequired,
  };

  return (
    <Fragment>
      {passengersInfo.map(({ firstname, lastname }, index) => (
        <TableRow key={Math.random()} firstname={firstname} lastname={lastname} index={index} />
      ))}
    </Fragment>
  );
}

const mapStateToProps = state => ({
  passengersInfo: state.user.passengersInfo,
});

export default connect(mapStateToProps)(TableRows);
