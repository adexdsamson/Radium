// Full post details page

import React, { Component } from 'react';
//import MainHeader from '../HeaderComponents/MainHeader';
import { withRouter } from "react-router-dom";
import { fetchPosts, authRef, fetchComent, CommentPost, fetchComment, ClapPost } from '../../utilities/firebase';
//import {IoIosChatbubbles} from 'react-icons/io';
//import {FaTwitter} from "react-icons/fa";
//import { FaFacebookSquare } from 'react-icons/fa';
import Clap from 'react-clap-button';
import Comment from './comment';
//import ClapComponent from 'react-clap';
import Moment from "react-moment";
import { connect } from "react-redux";
import swal from "sweetalert";

class StoryRenderComponent extends Component {
  constructor() {
    super();

    this.state = {
      post: "",
      comment: "",
      postComments: [],
      claps: "",
      img: [],
      title: "",
      userclaps: [],
      id: '',
      all: [],
      user: []
    };
  }

  componentDidMount() {
    fetchPosts
      .doc(`${this.props.match.params.id}`)
      .get()
      .then(doc => {
        //console.log(r.data[0])
        this.setState({
          id: doc.id,
          post: doc.data().body,
          img: doc.data().img,
          title: doc.data().title,
        });
      })
      .catch(err => console.log(err));
    //this.props.getUserDetails()
    // fetch users details
    var user = authRef.currentUser;
    user.providerData.forEach(profile => {
      let user = {
        UserId: profile.uid,
        name: profile.displayName,
        email: profile.email,
        photoURL: profile.photoURL
      }
      this.setState({
        user
      })
    });

    
  }

  componentDidUpdate(newState, preState) {
    //console.log("preProps : ", newState)
    //console.log("preState : ", preState)
    if (newState.postComments !== this.state.postComments) {
      fetchComment(this.state.id)
        .onSnapshot(doc => {
          const postComments = [];
          doc.forEach(doc => {
            postComments.push({
              id: doc.id,
              name: doc.data().name,
              body: doc.data().body,
              photoURL: doc.data().photoURL,
              time: doc.data().time
            })
            //console.log(comment)
            this.setState({
              postComments
            });

          })
        });
      //console.log(this.state.postComments)
    }
  }


  createMarkup(str) {
    return { __html: str };
  }


  addcomment() {
    var Postid = this.state.id;
    console.log(Postid)
    var now = new Date().toDateString();
    let comment = {
      id: Postid,
      body: this.state.comment,
      photoURL: this.state.user.photoURL,
      name: this.state.user.name,
      time: now
    }
    CommentPost(comment, Postid)
      .then(() =>
        fetchComment(Postid)
          .onSnapshot(doc => {
            swal({ text: "Your comment has been posted!" });
            const postComments = [];
            doc.forEach(doc => {
              postComments.push({
                id: doc.id,
                body: doc.data().body,
              })
              console.log(postComments)
              this.setState({
                postComments
              })
            })
   })).catch(err => console.log(err))

  }

  addClap() {

    let clap = { id: this.state.id }

    let newClaps = this.setState.claps += 1;
    let claps = { claps: newClaps }

   // submit the Id of the user into the array of the clap field in firebase
   //use length to get the number of claps on the post
  }

  addCommentClap(claps, id, e) {
    //e.preventDefault();
    let newClap = claps += 1;

    let clap = {
      claps: newClap
    }
    ClapPost(clap, id)
  }

  render() {

    let post;
    if (this.state.post) {
      post = this.state.post
    }

    let claps

    if (this.state.claps > 0) {
      claps = <Clap
        count={0}
        countTotal={this.state.claps}

        isClicked={false}
      />
    } else if (this.state.claps === 0) {
      claps = <Clap
        count={0}
        countTotal={0}

        isClicked={false}
      />
    }
    let num = this.state.claps;
    //console.log(this.props.user);
    //console.log(num);

    return (

      <div className="story-render-component-main-div">
        <div className="userBar" >
          <div className="story-render-user-bar" >
            <img className="story-render-user-bar-image" src={this.state.user.photoURl} alt="" />
            <div className="story-render-user-bar-info" >
             <span> <b> {this.state.user.name} </b></span>
              <span>{this.state.user.bio}</span>
              <span>
                <Moment format="MMM DD">
                  {this.state.date}
                </Moment>
              </span>

            </div>

          </div>
        </div>

        <div className="story-render-component-title" dangerouslySetInnerHTML={this.createMarkup(this.state.title)} />
        {this.state.img && <img src={this.state.img} alt="" />}
        <div
          className="story-render-component-body"
          dangerouslySetInnerHTML={this.createMarkup(post)}
        />
        <div className="story-render-component-clap-section">
          <div className="story-render-claps-section">
            <div className="story-render-component-clap-section-text">
              <h4>One clap, two clap, three clap, forty?</h4>
              <p>
                By clapping more or less, you can signal to us which stories
                really stand out.
              </p>
            </div>
            <div className="story-render-component-clap-section-icons-div">
              {this.state.user.name && <span onClick={() => this.addClap()} > {claps}  </span>}
            </div>
          </div>

          <div className="comments-section-main-div">
            {this.state.postComments.map(post => {
              return <Comment
                key={post.id}
                img={post.photoURL}
                name={post.name}
                Time={post.time}
                body={post.body}
                click={() =>
                  this.addCommentClap(post.clap, post.id)
                }
                clap={post.clap}
              />
            })}
          </div>

          {this.state.user.name && <div className="comment-input-main-div">
            <div className="comment-section-input-user-info">
              <img className="user-image"
                alt="..."
                src={this.state.user.photoURL} />
              <h5 className="mt-2">{this.state.user.name}</h5>
            </div>
            <textarea
              onChange={e => this.setState({ comment: e.target.value })}
              type="text"
              className="comment-input"
              placeholder="Comment.."
              value={this.state.comment}
            />

            <div className="publish-comment">
              <button className="publish-comment-button"
                onClick={() =>
                  this.addcomment()
                }
              >
                Publish
              </button>
            </div>
          </div>}
          

        </div>

      </div>
    );
  }
}

const mapStateToProps = state => state;
export default withRouter(connect(mapStateToProps)(StoryRenderComponent));