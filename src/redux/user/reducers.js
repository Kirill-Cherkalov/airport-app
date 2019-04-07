import actionTypes from './actionTypes';

const initialState = {
  request: {},
  loggedInUser: false,
  paymentSuccess: false,
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case actionTypes.USER_REQUEST:
      return {
        ...state,
        request: {
          ...action.request,
          adult: +action.request.adult || 0,
          child: +action.request.child || 0,
          infant: +action.request.infant || 0,
        },
      };
    case actionTypes.IS_LOGGED_IN_USER:
      return {
        ...state,
        loggedInUser: action.bool,
      };
    case actionTypes.PAYMENT_STATUS:
      return {
        ...state,
        paymentSuccess: action.bool,
      };
    default:
      return state;
  }
}
