import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

export default function TicketsList({ tickets }) {
  TicketsList.propTypes = {
    tickets: PropTypes.object.isRequired,
  };

  const { code, fromCountry, toCountry, price, planeInfo, schedule, flightPeriod } = tickets[0];

  const findDaysDiff = (startDate, endDate) => {
    const sd = new Date(startDate);
    const ed = new Date(endDate);
    const diffTime = ed.getTime() - sd.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const drawCalendarItems = () => {
    const { departureDate, arrivalDate } = flightPeriod;
    const diffDays = findDaysDiff(departureDate, arrivalDate);
    let startDate = moment(departureDate).format('llll');
    const days = [];

    for (let i = 0; i <= diffDays; i++) {
      startDate = moment(moment(new Date(departureDate)).add(i, 'days')).format('llll');
      const date = startDate.slice(0, 11);

      days.push((
        <div key={startDate} className="tickets-list__day">
          <span className="tickets-list__day-header">
            {`${date}`}
          </span>
        </div>
      ));
    }

    return days;
  };

  return (
    <section className="tickets-list">
      <div className="tickets-list__header">
        <pre>{fromCountry.name}   -->   {toCountry.name}</pre>
      </div>

      <div className="tickets-list__calendar">
        {drawCalendarItems()}
      </div>

      <div className="m">
      
      </div>
    </section>
  );
}
