export function userRequest(state = {}, action) {
  switch (action.type) {
    case 'USER_REQUEST':
      return action.request;
    default: 
      return state;
  }
}