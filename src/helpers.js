// special function to define, which ticket(tickets) was(were) selected by user

const defineAvailableFlights = (selectedFlight, returnSelectedFlight) => {
  let flights = [];
  if (returnSelectedFlight.id && selectedFlight.id) {
    flights = [selectedFlight, returnSelectedFlight];
  }
  if (selectedFlight.id) {
    flights = [selectedFlight];
  } else {
    flights = [returnSelectedFlight];
  }
  return flights;
};

export default defineAvailableFlights;
