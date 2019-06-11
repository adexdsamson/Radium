import { FETCH_USER } from "../reducer";

export default (state = false, action) => {
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false;
    default:
      return state;
  }
};

