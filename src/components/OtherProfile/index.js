import React, { Component } from 'react';
import { connect } from "react-redux";
import { ADD_USER, getUserDetails } from '../../store/reducer';
import { fetchUser, UserPost } from '../../utilities/firebase';
import { withRouter } from "react-router-dom";
import TabHeader from '../subcomponent/TabHeader';
import Latest from './Latest';
import Following from './Following';
import Followers from './Followers';
import Clapped from './Clapped';




class OtherProfilePage extends Component {
  constructor() {
    super();

    this.state = {
      userprofile: [],
      following: [],
      followers: [],
      posts: [],
      clappedPosts: [],
      disabled: true,
      follow: false,
      editbio: "",
      selectedtab: "TabHeading1",
      isFollowing: false
    };

    this.handleClick = this.handleClick.bind(this);
    this.followUser = this.followUser.bind(this);
    this.unFollowUser = this.unFollowUser.bind(this);
    this.allowEdit = this.allowEdit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.cancel = this.cancel.bind(this);
    this.submitNewBio = this.submitNewBio.bind(this);
    this.changeTab = this.changeTab.bind(this);
  }

  componentDidMount() {
    fetchUser
      .doc(`${this.props.match.params.id}`)
      .then(doc => {
        let userprofile = {
          name: doc.data().name,
          photoURL: doc.data().photoURL,
          UserId: doc.data().UserId
        }
        this.setState({
          userprofile
        })
      })
     UserPost(this.state.userprofile.UserId)
       .onSnapshot(doc => {
         //console.log(user.uid)
         const posts = [];
         doc.forEach(doc => {
           posts.push({
             id: doc.id,
             body: doc.data().body,
             img: doc.data().img,
             topic: doc.data().topic,
             title: doc.data().title
           })

           this.setState({
             posts
           })
         })
       })
    //axios
     // .get(`/api/following/${this.props.match.params.id}`)
     // .then(response => this.setState({ following: response.data }))
     // .catch(() => []);

   // axios
   //   .get(`/api/followers/${this.props.match.params.id}`)
   //   .then(response => this.setState({ followers: response.data }))
   //   .catch(() => []);

   // axios
   //   .get(`/api/userclaps/${this.props.match.params.id}`)
   //   .then(response => {
   //     this.setState({ clappedPosts: response.data });
    //  })
    //  .catch(() => []);
  }

  allowEdit() {
    this.setState({ disabled: !this.state.disabled });
  }

  cancel() {
    this.setState({ editbio: "", disabled: true });
  }

  handleChange(val) {
    this.setState({ editbio: val });
  }

  handleClick(val) {
    this.setState({ currentTab: val });
  }

  followUser(followerID, followedID) {
   // axios
    //  .post("/api/follow/add", {
    //    followerID: followerID,
     ///   followedID: followedID
    ///  })
     /// .then(respone => {
     //   window.location.reload();
    //  })
    //  .catch(() => []);
  }

  unFollowUser(followerID, followedID) {
    //axios
     // .delete(`/api/unfollow/${followerID}/${followedID}`)
     // .then(response => {
     //   window.location.reload();
     // })
     // .catch(() => []);
  }

  submitNewBio(id, bio) {
    if (bio === "") {
      bio = this.props.user.bio;
    }
    //axios
     // .put("/api/editbio", { id: id, bio: bio })
     // .then(response => {
      ///  console.log(response);
     // })
     // .then(window.location.reload())
     // .catch(() => []);
  }

  changeTab(val) {
    this.setState({ selectedtab: `${val}` });
  }

  render() {
    let latest;
    this.state.posts.length > 0
      ? (latest = (
          <Latest user={this.state.userprofile} posts={this.state.posts} />
        ))
      : (latest = "No posts made yet.");

    let following;
    this.state.following.length > 0
      ? (following = (
          <Following
            profile={this.state.userprofile}
            following={this.state.following}
          />
        ))
      : (following = "You are following anyone");

    let followers;
      this.state.followers.length > 0
        ? (followers = (
            <Followers
              user={this.state.userprofile}
              followers={this.state.followers}
            />
          ))
        : (followers = "You have no followers");

    let clappedPosts;
    this.state.clappedPosts.length > 0
      ? (clappedPosts = (
          <Clapped
            user={this.state.userprofile}
            claps={this.state.clappedPosts}
          />
        ))
      : (clappedPosts = "You haven't clapped any posts");
    let selected;

    if (this.state.selectedtab === "TabHeading1") {
      selected = latest;
    }

    if (this.state.selectedtab === "following") {
      selected = following;
    }

    if (this.state.selectedtab === "followers") {
      selected = followers;
    }
    if (this.state.selectedtab === "TabHeading2") {
      selected = clappedPosts;
    }

    let isFollowing = function(arr, id) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].id === id) {
          return true;
        }
      }
      return false;
    };

    let followBtn;

    if (
      this.state.userprofile !== this.props.user &&
      isFollowing(this.state.followers, this.props.user) === false
    ) {
      followBtn = (
        <button
          onClick={() =>
            this.followUser(this.props.user, this.state.userprofile)
          }
          button
          className="profile-follow-btn"
        >
          Follow
        </button>
      );
    } else if (
      this.state.userprofile.id !== this.props.user.id &&
      isFollowing(this.state.followers, this.props.user.id)
    ) {
      followBtn = (
        <button
          onClick={() =>
            this.unFollowUser(this.props.user, this.state.userprofile)
          }
          button
          className="profile-follow-btn"
        >
          Unfollow
        </button>
      );
    } else if (
      this.state.userprofile === this.props.user ||
      this.props.user === undefined
    ) {
      followBtn = false;
    }
    return (
      <div className="profile-page-main-div">
        <div className="profile-page-header">
          <div className="hero-profile">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%"
              }}
            >
              <h1>
                {this.state.userprofile.firstname
                  ? `${this.state.userprofile.firstname} ${
                      this.state.userprofile.lastname
                    }`
                  : "No user"}
              </h1>

              {this.state.userprofile.bio ? (
                <input
                  className="userbio"
                  type="text"
                  placeholder={this.state.userprofile.bio}
                  value={this.state.editbio}
                  disabled={this.state.disabled}
                  onChange={e => this.handleChange(e.target.value)}
                  style={{
                    fontSize: "16px",
                    width: "100%",
                    height: "15vh",
                    textOverflow: "visible",
                    marginRight: "10px"
                  }}
                />
              ) : (
                false
              )}
            </div>
            <img
              className="profile-user-image"
              alt="..."
              src={
                this.state.userprofile.avatar
                  ? `${this.state.userprofile.avatar}`
                  : "https://cdn-images-1.medium.com/fit/c/125/125/0*WrSrr3mpeHkyCZzh."
              }
            />
          </div>
          <div
            style={{ display: "flex", cursor: "pointer" }}
            onClick={e => this.handleClick(e.target.id)}
          >
            <h5
              style={{ marginRight: "15px", fontSize: ".95em", opacity: ".54" }}
              id="follwing"
              onClick={() => this.changeTab("following")}
            >
              {this.state.following.length} Following
            </h5>
            <h5
              style={{ fontSize: ".95em", opacity: ".54" }}
              id="followers"
              onClick={() => this.changeTab("followers")}
            >
              {this.state.followers.length} Followers
            </h5>
          </div>

          {this.props.user === this.state.userprofile ? (
            <button
              onClick={() => this.allowEdit()}
              className="profile-edit-btn"
              disabled={!this.state.disabled}
            >
              Edit
            </button>
          ) : (
            false
          )}
          {followBtn}
          {console.log(this.props.user)}
          {console.log(this.state)}
          {this.state.disabled === false ? (
            <div>
              <button
                onClick={() =>
                  this.submitNewBio(this.props.user, this.state.editbio)
                }
                className="profile-follow-btn"
              >
                Submit
              </button>
              <button
                className="profile-edit-btn"
                onClick={() => this.cancel()}
              >
                Cancel
              </button>
            </div>
          ) : (
            false
          )}
        </div>
        <div
          style={{
            marginTop: "180px",
            cursor: "pointer",
            width: "80%",
            fontSize: "16px",
            textAlign: "left",
            paddingLeft: "30px"
          }}
          onClick={e => this.changeTab(e.target.id)}
        >
          <div style={{ width: "80%", marginTop: "50px" }}>
            <TabHeader
              tabs={["Latest", "Claps"]}
              styles="text-align-left profile-tabs"
            />
          </div>
        </div>
        {selected}
      </div>
    );
  }
}
 
function mapStateToProps(state) {
  return state;
}

export default withRouter(connect(mapStateToProps, { ADD_USER })(OtherProfilePage));
