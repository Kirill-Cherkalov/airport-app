import React from 'react';
import './index.scss';

function PlaneSeats({
  rows, location, selectedPassenger, passengersInfo, setInfo, soldSeats,
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
  const selectedSeats = passengersInfo.map(({ selectedSeat }) => selectedSeat);

  return (
    rowss.map((elem, index) => (
      <div key={index} className="row seats">
        {location.map((place, j) => {
          const id = index + 1 + location[j];
          const isDisable = soldSeats.some(seat => seat === id);
          const isSelected = selectedSeats.some(seat => seat === id);
          return (place ? (
            <div
              id={id}
              key={index + j}
              className={`seat${isDisable ? ' disabled' : ''}${isSelected ? ' selectedSeat' : ''}`}
              onClick={isDisable || isSelected ? null : selectSeat}
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

export default PlaneSeats;
