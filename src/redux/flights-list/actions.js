// export function selectedFlightInfo(info) {
//   return {
//     type: 'SELECTED_FLIGHT_INFO',
//     info
//   }
// }

export default function flightPrice(price) {
  return {
    type: 'FLIGHT_PRICE',
    price,
  };
}

// export function setPrice(price) {
//   dispatch(flightPrice(price));
// }
