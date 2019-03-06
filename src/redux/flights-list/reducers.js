// export function selectedFlightInfo(state = {}, action) {
//   switch (action.type) {
//     case 'SELECTED_FLIGHT_INFO':
//       return action.info;
//     default:
//       return state;
//   }
// }

export function flightPrice(state = 150, action) {
  switch (action.type) {
    case 'FLIGHT_PRICE':
      return action.price;
    default:
      return state;
  }
}