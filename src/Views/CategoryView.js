import React, { Component } from "react";
import MainHeader from "../components/MainHeader";
import CategoryCard from "../components/CardComponent/CategoryCard";
import { connect } from "react-redux";
import {
  getCategories,
  getAllPostCategory,
  addUserInterest,
  removeUserInterest,
  getUserDetails,
  getReadingList
} from "../store/reducer";
import { withRouter, Link } from "react-router-dom";
import { Category, authRef } from '../utilities/firebase';
import swal from "sweetalert";

class CategoryView extends Component {
  constructor() {
    super();
    this.state = {
      categoryId: "",
      posts: []
    };
  }
  componentDidMount() {
    this.props.getCategories();
    var user = authRef.currentUser.uid;
    if (user) {
      //this.props.getReadingList(user)
        //.then(response => {
       // this.props.getUserInterests(user);
       // Category(`${this.props.match.params.id}`)
         // .then(response => {
         //   this.setState({ categoryId: this.props.match.params.id });
         // });
      //});
    }
  }
  componentDidUpdate() {
    if (this.props.match.params.id !== this.state.categoryId) {
      Category(`${this.props.match.params.id}`)
        .get()
        .then(doc => {
          const posts = [];
          doc.forEach(doc => {
            posts.push({
              id: doc.id,
              name: doc.data().name,
              body: doc.data().body,
              img: doc.data().img,
              photoURL: doc.data().avatar,
              userId: doc.data().id,
              title: doc.data().title
            })
            this.setState({
              posts
            })
          })
        })
        
    }
  }
  render() {
    //let followButton = this.props.userInterests.find(
      //val => val.category === this.props.match.params.id
    //) ? (
      //<div
        //className="category-view-unfollow-button"
        //onClick={() =>
          //this.props.removeUserInterest(
          //  this.props.user.id,
           // this.state.categoryId
         // )
       // }
     // >
      //  Following
    //  </div>
   // ) : (
   //   <div
    //    className="category-view-follow-button"
      //  onClick={() =>
        //  this.props.user.id
       //     ? this.props.addUserInterest(
        //        this.props.user.id,
        //        this.state.categoryId
        //      )
       //     : swal({ text: "Sign in to follow your favorite categories" })
       // }
    //  >
    //    Follow
     // </div>
   // );
    const capitalizeAll = str => {
      return str.toUpperCase();
    };
    const categoriesReel = 
      this.props.categories.length > 0
        ? this.props.categories.map((val, index) => (
            <Link
              to={`/topic/${val.name}/${val.name}`}
              key={index}
              className="topic-nav-link"
            >
              {capitalizeAll(val.name)}
            </Link>
          ))
        : "Loading....";
    
    let categoryReel =
      this.state.posts.length > 0
        ? this.state.posts.map((val, index) => {
            return (
              <CategoryCard
                key={index}
                id={val.id}
                userid={val.userId}
                title={val.title}
                name={val.name}
                image={val.img}
                userImage={val.photoURL}
                date={val.date}
                rating={val.rating}
                body={val.body}
              />
            );
          })
        : "Loading ...";
    return (
      <div className="category-view-main-container">
        <MainHeader />
        <div className="category-view-header">
          <div className="category-view-title-follow">
            <div className="topic-header-grid">
              <Link to={"/"} className="topic-nav-link">
                HOME
              </Link>
              {categoriesReel}
            </div>
            
          </div>
        </div>
        <div className="for-you-render">
          <div className="for-you-reel">{categoryReel}</div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return state;
}
export default withRouter(
  connect(mapStateToProps, {
    getAllPostCategory,
    addUserInterest,
    removeUserInterest,
    getUserDetails,
    getReadingList,
    getCategories
  })(CategoryView)
);
