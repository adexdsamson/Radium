
import { GET_USER_INTERESTS, REMOVE_USER_INTEREST,ADD_USER_INTEREST } from "../reducer";

const initialState = {
  userInterests: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_INTERESTS:
      
      //console.log("categories" + action.payload.name)
      return Object.assign({}, state, {
        isLoading: false,
        userInterests: action.payload
      });
    case ADD_USER_INTEREST:
      return Object.assign({}, state, {
        isLoading: false,
        userInterests: action.payload
      });
    case REMOVE_USER_INTEREST:
      return Object.assign({}, state, {
        isLoading: false,
        userInterests: action.payload
      });
    default:
      return state;
  }
};