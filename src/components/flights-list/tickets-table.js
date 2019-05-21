import React from 'react';
import PropTypes from 'prop-types';

export default function TicketsList({ tickets }) {
  TicketsList.propTypes = {
    tickets: PropTypes.object.isRequired,
  };

  const { code, fromCountry, toCountry, price, planeInfo, schedule, flightPeriod } = tickets[0];
  // console.log(tickets[0]);
  return (
    <section className="tickets-list">
      <div className="tickets-list__header">
        <pre>{fromCountry.name}   -->   {toCountry.name}</pre>
      </div>

      <div className="tickets-list__calendar">
      
      </div>
    </section>
  )
}
