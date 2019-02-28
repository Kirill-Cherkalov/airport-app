import React from 'react';

export function SeatsSigns({location, signs}) {
  return (
    <div className="row">
      {location.map((elem, index) => {
        return elem ? 
          <div key={Math.random()} className="sign seat"><span className="sign seat">{signs[index]}</span></div>
          : <div key={Math.random()} className="empty"></div>
      })}
    </div>
  );
}

