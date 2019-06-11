import { FETCH_USER_DETAILS } from '../reducer';


export default (state = [], action) => {

  switch (action.type) {
    case FETCH_USER_DETAILS:

      console.log("user" + action.payload)
      console.log("user" + state)
      return action.payload || null
    
    default:
      return state;
  }
};