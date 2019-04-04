import React from 'react';
import { connect } from 'react-redux';
import { setPassengersInfo } from '../../../../redux/user/actions';
import './index.scss';

function PlaneSeats({
  rows, location, selectedPassenger, passengersInfo, setInfo, boughtSeats,
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
        {location.map((place, j) => {
          const id = index + 1 + location[j];
          const isDisable = boughtSeats.filter(seat => seat === id).length ? 1 : 0;
          return (place ? (
            <div
              id={id}
              key={index + j}
              className={`seat${isDisable ? ' disabled' : ''}`}
              onClick={isDisable ? null : selectSeat}
            >
              <span id={id} className="seat-point">{id}</span>
              {isDisable ? null : <span className="tooltiptext">$9</span>}
            </div>
          )
            : <div key={Math.random()} className="empty">{index + 1}</div>);
        })}
      </div>
    ))
  );
}

const mapStateToProps = state => ({
  selectedPassenger: state.user.selectedPassenger,
  passengersInfo: state.user.passengersInfo,
  boughtSeats: state.user.selectedFlight.boughtSeats,
});

const mapDispatchToProps = dispatch => ({
  setInfo: info => dispatch(setPassengersInfo(info)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlaneSeats);
