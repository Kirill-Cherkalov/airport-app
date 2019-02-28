import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import WorkIcon from '@material-ui/icons/Work';
import './index.scss';

export function Luggage({selectLuggage}) {
  const luggageTypes = [
    {
      kg: 10,
      price: 9
    },
    {
      kg: 20,
      price: 15
    },
    {
      kg: 30,
      price: 21
    },
  ];

  return (
    <ul className="luggage-list">
      {luggageTypes.map(({kg, price}) => {
        return <li id={price} className="luggage-list__item" onClick={selectLuggage} key={Math.random()}>
          <Avatar>
            <WorkIcon />
          </Avatar>
          <div className="luggage-list__text"><span>{kg} kg</span><span>$ {price}.00</span></div>
        </li>
      })}

      <li id={0} className="luggage-list__item" onClick={selectLuggage}>
        <Avatar>
          <WorkIcon />
        </Avatar>
        <div className="luggage-list__text">Free carry-on bag</div>
      </li>
    </ul>
  );
}