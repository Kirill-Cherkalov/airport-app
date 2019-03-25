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
    rowss.map((elem, i) => (
      <div key={Math.random()} className="row seats">
        {location.map((place, j) => (place
          ? (
            <div id={j + 1 + location[j]} key={Math.random()} className="seat" onClick={selectSeat}>
              <span id={j + 1 + location[j]} className="seat-point">{j + 1 + location[j]}</span>
              <span className="tooltiptext">$9</span>
            </div>
          )
          : <div key={Math.random()} className="empty">{i + 1}</div>))}
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
