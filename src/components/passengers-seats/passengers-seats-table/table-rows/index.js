import React, {Fragment} from 'react';
import {TableRow} from './table-row';
import './index.scss';

export function TableRows({passengers}) {
  let i = 1;
  return (
    <>
      {passengers.map(({type, amount}) => {
        const arr = new Array(amount).fill(amount);

        return <Fragment key={Math.random()}>
          {arr.map(() => {
            return <TableRow key={Math.random()} type={type} index={i++}/>
          })}
        </Fragment>
      })}
    </>
  );
}
