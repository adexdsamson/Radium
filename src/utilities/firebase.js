import app from 'firebase/app';
import 'firebase/auth';
import '@firebase/storage';
import '@firebase/firestore';


var config = {
  apiKey: "AIzaSyC4As8rQ-Qn6CT6hiZNdNubhVvJeP2WjqQ",
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID
};
app.initializeApp(config);

export var auth = app.auth();


export const authRef = app.auth();
// *** Auth API ***


export const firebase = app




// firebase providerId authentication
export var providerGoogle = app.auth.GoogleAuthProvider.PROVIDER_ID
export var providerFacebook = app.auth.FacebookAuthProvider.PROVIDER_ID










// firebase auth function
export const User = auth.currentUser;
export const onAuth = (userInfo) => app.auth().onAuthStateChanged(userInfo)










// firebase Email and password functions

export const doSignOut = () => this.auth.signOut();
export const doPasswordReset = email => auth.sendPasswordResetEmail(email);
export const doPasswordUpdate = password =>
  auth.currentUser.updatePassword(password);
export const signIn = (email, password) =>
  authRef.signInWithEmailAndPassword(email, password);
export const createUser = (email, password) =>
  authRef.createUserWithEmailAndPassword(email, password);







// firebase Firestore set functions

export const Userdatabas =
  app.firestore()
    .collection('users')

export const Userdatabase = (Data, Id) =>
  app.firestore()
    .collection('users')
    .doc(Id)
    .set(Data);

export const Posts = (Data, id) =>
  app.firestore()
    .collection('posts')
    .add(Data)

export const ClapPost = (Data, uid) => 
  app.firestore()
  .collection('comment')
    .doc(uid)
  .set(Data)

export const CommentPost = (Data) =>
  app.firestore()
    .collection('comment')
    .add(Data)

export const AddStory = (Data, userId) =>
  app.firestore()
    .doc(userId)
    .set(Data)








// firebase firestore get function

export const Categories = app
  .firestore()
  .collection('Categories')
  .get()
export const fetchPosts = app.firestore().collection('posts')

export const user = app.firestore().collection('users')











// firebase firestore queries
export const query1 = Userdatabas.where("posts", "==", "posts")
export const QueryUser = (uid) =>
  user.where("UserId", "==", uid)

export const UserPost = (uid) =>
  app.firestore()
    .collection('posts')
    .where("id", "==", uid)
    .limit(20)

export const fetchComment = (uid) =>
  app.firestore()
    .collection('comment')
    .where("id", "==", uid)

export const fetchUser = (uid) => 
  app.firestore()
    .collection('users')
    .where("UserId", "==", uid)
  
export const Category = (uid) =>
  app.firestore()
    .collection('posts')
    .where("categories", "==", uid)
    
export const UserInterestQuery = () => 
  app.firestore()
    .collection('users')
    .where("interest", "==", "interest")
    .get()





// firebase storage ref
export const storageRef = app.storage().ref("images");