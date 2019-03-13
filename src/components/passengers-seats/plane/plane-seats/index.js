import React from 'react';
import { connect } from 'react-redux';
import { setPassengersInfo } from '../../../../redux/user/actions';
import './index.scss';

function PlaneSeats({
  rows, location, signs, selectedPassenger, passengersInfo, setInfo,
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
    rowss.map((elem, i) => {
      i++;
      return (
        <div key={Math.random()} className="row seats">
          {location.map((place, j) => (place
            ? (
              <div id={i + signs[j]} key={Math.random()} className="seat" onClick={selectSeat}>
                <span id={i + signs[j]} className="seat-point">{i + signs[j]}</span>
                <span className="tooltiptext">$9</span>
              </div>
            )
            : <div key={Math.random()} className="empty">{i}</div>))}
        </div>
      );
    })
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
