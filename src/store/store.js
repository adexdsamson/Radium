import {
  createStore, applyMiddleware, combineReducers
} from "redux";
import auth from './reducers/user';
import categories from './reducers/categories';
import posts from './reducers/posts';
import users from './reducers/detail';
import userInterest from './reducers/userInterest';
import thunk from 'redux-thunk';
//import reducer from "./reducer";

const reducer = combineReducers({
  auth,
  categories,
  posts,
  userInterest,
  users
});


const store = createStore(reducer, {}, applyMiddleware(thunk));


export default store;