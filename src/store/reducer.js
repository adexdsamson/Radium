import {
  authRef,
  User,
  //QueryUserDetail,
  signIn,
  AddStory,
  Categories,
  doSignOut,
  doPasswordReset,
  createUser,
  UserPost,
  Category,
  UserInterestQuery,
  QueryUser
} from '../utilities/firebase';
//const TEST = "TEST";
export const GET_ALL_POSTS = "GET_ALL_POSTS";
export const ADD_USER = 'ADD_USER';
export const FETCH_USER = 'AUTH_USER';
export const SIGN_IN = 'SIGN_IN';
export const RESET_PASSWOOD = 'RESET_PASSWORD';
export const ADD_STORY = "ADD_STORY";
export const FETCH_USER_DETAILS = "FETCH_USER_DETAILS";
export const GET_USER_FOLLOWING = "GET_USER_FOLLOWING";
export const GET_CATEGORIES = "GET_CATEGORIES";
export const LOGOUT = "LOGOUT";
export const GET_USER_INTERESTS = "GET_USER_INTERESTS";
export const ADD_USER_INTEREST = "ADD_USER_INTEREST";
export const REMOVE_USER_INTEREST = "REMOVE_USER_INTEREST";
export const GET_ALL_POST_CATEGORY = "GET_ALL_POST_CATEGORY";
export const ADD_TO_READING_LIST = "ADD_TO_READING_LIST";
export const GET_READING_LIST = "GET_READING_LIST";
export const DELETE_FROM_READING_LIST = "DELETE_FROM_READING_LIST";


export const fetchUser = () => dispatch => {
  authRef.onAuthStateChanged(user => {
    if (user) {
      dispatch({
        type: FETCH_USER,
        payload: user
      });
    } else {
      dispatch({
        type: FETCH_USER,
        payload: null
      });
    }
  });
};

export const getAllPosts = () => dispatch => {
  dispatch({
    type: GET_ALL_POSTS,
    payload: {}
  })
}


export function addStory() {
  return {
    type: ADD_STORY,
    payload: AddStory
  };
}

export function getUserFollowing(id) {
  return {
    type: GET_USER_FOLLOWING,
    payload: {}
  };
}

export const getUserDetails = () => dispatch => {
  var user = authRef.currentUser.uid;
  console.log(user)
  QueryUser(user)
    .get()
    .then(doc => {
      //console.log(doc)
      const user_detail = [];
      doc.forEach(doc => {
        user_detail.push({
          UserId: doc.data().UserId,
          email: doc.data().email,
          interest: doc.data().interest,
          name: doc.data().name,
          photoURL: doc.data().photoURL
        });
      });
      //console.log(user_detail)
      dispatch({
        type: FETCH_USER_DETAILS,
        payload: user_detail
      });
    })
}

export const getCategories = () => dispatch => {
  Categories
    .then(doc => {
      const cat = [];
      doc.forEach(doc => {
        cat.push({
          name: doc.data().name
        })
      })
     // console.log(cat)
      dispatch({
        type: GET_CATEGORIES,
        payload: cat
      });
    })
}


export const getUserPost = (uid) => dispatch => {
  UserPost(uid)
  .onSnapshot(doc => {
    //console.log(this.state.userprofile.UserId)
    const posts = [];
    doc.forEach(doc => {
      posts.push({
        id: doc.data().id,
        body: doc.data().body,
        img: doc.data().img,
        topic: doc.data().topic,
        title: doc.data().title
      })
      dispatch({
        type: FETCH_USER_DETAILS,
        payload: posts
      })
    })
  })
}

export const SignOut = () => dispatch => {
  doSignOut()
}

export const ResetPassword = (email) => dispatch => {
  doPasswordReset(email)
    .then(result => {
      dispatch({
        type: RESET_PASSWOOD

      });
      this.props.history.push('/login');
    })
}

//This hasn't been fully set up in the switch statement or initialstate
//export const getUserInterests = (userId) => dispatch => {
  //UserInterestQuery(userId)
    //.then(doc => {
     // let userInterest = {};
     // userInterest.forEach(doc => {
      //  userInterest.push({
       //   name: doc.data()
      //  })
     // })
     // console.log(userInterest)
     // dispatch({
      //  type: GET_USER_INTERESTS,
      ///  payload: userInterest
     // });
   // })
//}

export function addUserInterest(userid, category) {
  return {
    type: ADD_USER_INTEREST,
    payload: {}
  }
}

export function removeUserInterest(userid, category) {
  return {
    type: REMOVE_USER_INTEREST,
    payload: {

    }
  };
}

export function getAllPostCategory(categoryId) {
  Category(categoryId)
  return {
    type: GET_ALL_POST_CATEGORY,
    payload: {

    }
  };
}

export function addToReadingList(userid, id) {
  return {
    type: ADD_TO_READING_LIST,
    payload: {}
  };
}

export function deleteFromReadingList(userid, postid) {
  return {
    type: DELETE_FROM_READING_LIST,
    payload: {}
  };
}

export function getReadingList(userid) {
  return {
    type: GET_READING_LIST,
    payload: {}
  };
}