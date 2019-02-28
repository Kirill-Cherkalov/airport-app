import React from 'react';
import './index.scss';

export function TableRow({index, type}) {
  return (
    <tr className="passengers-seats__passenger">
      <td className="passengers-seats__info td">{index} {type}</td>
      <td className="passengers-seats__seat td">seat</td>
    </tr>
  );
}