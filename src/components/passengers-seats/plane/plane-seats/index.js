import React from 'react';
import { connect } from 'react-redux';
import { setPassengersInfo } from '../../../../redux/user/actions';
import './index.scss';

function PlaneSeats({
  rows, location, selectedPassenger, passengersInfo, setInfo,
}) {
  const rowss = new Array(rows).fill(1);

  const selectSeat = (event) => {
    const { id } = event.target;

    const newInfo = passengersInfo.map((passenger, index) => {
      if (index === selectedPassenger) {
        return { ...passenger, selectedSeat: id };
      }
      return passenger;
    });

    setInfo(newInfo);
  };

  return (
    rowss.map((elem, index) => (
      <div key={index} className="row seats">
        {location.map((place, j) => (place
          ? (
            <div id={index + 1 + location[j]} key={index + j} className="seat" onClick={selectSeat}>
              <span id={index + 1 + location[j]} className="seat-point">{index + 1 + location[j]}</span>
              <span className="tooltiptext">$9</span>
            </div>
          )
          : <div key={Math.random()} className="empty">{index + 1}</div>))}
      </div>
    ))
  );
}

const mapStateToProps = state => ({
  selectedPassenger: state.user.selectedPassenger,
  passengersInfo: state.user.passengersInfo,
});

const mapDispatchToProps = dispatch => ({
  setInfo: info => dispatch(setPassengersInfo(info)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlaneSeats);
