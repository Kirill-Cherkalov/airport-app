import actionTypes from './actionTypes';

const initialState = {
  ordersErrored: false,
  orders: [],
};

export default function userOrdersInfo(state = initialState, action) {
  switch (action.type) {
    case actionTypes.FETCHED_USER_ORDERS:
      return {
        ...state,
        orders: action.orders,
      };
    case actionTypes.FETCHED_USER_ORDERS_ERRORED:
      return {
        ...state,
        ordersErrored: action.bool,
      };
    default:
      return state;
  }
}
