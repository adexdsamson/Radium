
import { GET_CATEGORIES } from "../reducer";


export default (state = [], action) => {
  switch (action.type) {
    case GET_CATEGORIES:
      
      //console.log("categories" + action.payload)
      return  action.payload || null
      
    default:
      return state;
  }
};