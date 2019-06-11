import React, { Component } from 'react';
import './index.css';
import { Link } from "react-router-dom";
//import { authRef } from '../../utilities/firebase';
import smartTruncate from 'smart-truncate';
import { connect } from 'react-redux';
import PopOver from "../subcomponent/popOver";
import { fetchPosts } from '../../utilities/firebase';

class FeatureView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Posts: [],
      user: []
    };
  }

  componentDidMount() {
    
    fetchPosts
      .onSnapshot(doc => {
        const Posts = [];
        doc.forEach(doc => {
          Posts.push({
            id: doc.id,
            body: doc.data().body,
            img: doc.data().img,
            topic: doc.data().topic,
            title: doc.data().title
          })
          //console.log("post " + doc.id)
          this.setState({
            Posts
          })
        })
      })
  }

  createMarkup(str) {
    return { __html: str };
  }


  render() {

    var posts = this.state.Posts;
    if (this.state.Posts.length > 0) {
      return (
        <div className="featured-view-main-div featured-grid">
          <div key={this.state.Posts[0].id} className="big-picture grid-0">
            <div
              className="big-picture-image grid-0a"
              style={{
                backgroundImage: `url(${
                  this.state.Posts[0].img
                })`
              }}
            />
            <div className="big-picture-text grid-0b">
              <div className="big-picture-text-tab">
                <h4>FEATURED</h4>
              </div>
              <Link to={`/story-view/${posts[0].postid}`}>
                <div className="big-picture-description">
                  <div
                    className="featured-card-title"
                    dangerouslySetInnerHTML={this.createMarkup(this.state.Posts[0].title)}
                  />
                  <div
                    className="featured-card-text"
                    dangerouslySetInnerHTML={this.createMarkup(
                      smartTruncate(this.state.Posts[0].body, 100)
                    )}
                  />
                </div>
              </Link>
              <Link
                style={{ color: "black", opacity: ".56" }}
                to={`/user/${posts[0].id}`}
              >
                <PopOver
                  activeUser={this.props.user}
                  user={this.state.Posts[0]}
                  name={this.state.Posts[0].name}
                >
                  {" "}
                  <h6>{posts[0].name}</h6>
                </PopOver>
              </Link>
            </div>
          </div>
          {this.state.Posts.map(info => {
            return <div key={info.id} className="small-picture grid-a">
              <Link to={`/story-view/${info.id}`}>
                <div
                  className="featured-small-picture picture-a"
                  style={{
                    backgroundImage: `url(${
                      info.img
                    })`
                  }}
                />
              </Link>
              <div className="small-picture-text">
                <Link to={`/story-view/${info.id}`}>
                  <div
                    className="featured-small-card-title"
                    dangerouslySetInnerHTML={this.createMarkup(info.title)}
                  />
                  <div
                    className="featured-card-text"
                    dangerouslySetInnerHTML={this.createMarkup(
                      smartTruncate(info.body, 100)
                    )}
                  />
                </Link>
                <Link
                  style={{ color: "black", opacity: ".56" }}
                  to={`/user/${info.id}`}
                >
                  <PopOver
                    activeUser={this.state.user}
                    user={this.state.Posts[0]}
                    name={info.name}
                >
                  {" "}
                  <h6>{posts[0].name}</h6>
                </PopOver>
                </Link>
              </div>
            </div>
          })}
      </div>
     ) 
    }
    
    return <div className = "featured-view-main-div featured-grid" > Loading....</div>;
  }
}
 
const mapStateToProps = state => state;
export default connect(mapStateToProps)(FeatureView);

