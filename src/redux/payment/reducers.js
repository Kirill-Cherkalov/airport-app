import actionTypes from './actionTypes';

const initialState = {
  paymentData: [],
  getPaymentDataError: false,
};

export default function airports(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_PAYMENT_DATA:
      return {
        ...state,
        paymentData: action.payload,
      };
    case actionTypes.GET_PAYMENT_DATA_ERROR:
      return {
        ...state,
        getPaymentDataError: action.payload,
      };
    default:
      return state;
  }
}
