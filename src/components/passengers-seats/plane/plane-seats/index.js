import React from 'react';
import './index.scss';

export function PlaneSeats({rows, location, signs}) {
  const rowss = new Array(rows).fill(1);

  return (
    rowss.map((elem, i) => {
      ++i;
      return <div key={Math.random()} className="row seats">
        {location.map((elem, j) => {
          return elem ?
            <div id={i + signs[j]} key={Math.random()} className="seat">
              <span className="seat-point">{i + signs[j]}</span>
              <span className="tooltiptext">$9</span>
            </div>
            : <div key={Math.random()} className="empty">{i}</div>
        })}
      </div>
    })
  );
}