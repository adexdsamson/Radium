import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Moment from "react-moment";

class SearchCard extends Component {
  render() {
    console.log("this is props",this.props)
    let shortenDescription = function(str) {
      let periodIndex = str
        .split("")
        .findIndex(val => val === "." || val === "?" || val === "!");
      let newStr = str
        .split("")
        //find end of first sentence and slice
        .slice(0, periodIndex + 1)
        // make sure new sentence is 51 characters long
        .slice(0, 51);
      for (let i = newStr.length - 1; i > 0; i--) {
        if (newStr[i] === "!" || newStr[i] === "." || newStr[i] === "?") {
          return newStr.join("");
        }
        if (newStr[i] === " ") {
          newStr.pop();
          newStr.push("...");
          return newStr.join("");
        } else {
          newStr.pop();
        }
      }
    };
    let shortDescription = shortenDescription(this.props.body);

  function createMarkup(str) {
    return { __html: str };
  }
    return (
      <div className="search-card">
      <Link to={`/user/${this.props.userid}`}>
        <div className="search-card-title">
        
          <img src={this.props.avatar}
            alt="..."
            className="search-card-face-icon"
          />
        
          <div className="search-card-title-header">
            <div>
              <h4 className="search-card-title-name">
                {this.props.authorName}
              </h4>
            </div>
              <Moment format="MMM DD">{this.props.date}</Moment>
            </div>
        </div>
        </Link>
        <div className="search-card-content">
          
            <div className="search-card-inner-content">
            <Link to={`/story-view/${this.props.id}`}>
              <div
                className="search-card-image"
                style={{ backgroundImage: `url(${this.props.img})` }}
              />
              <h1 className="search-card-article-title" dangerouslySetInnerHTML={createMarkup(this.props.title)}></h1>
              <h3 className="search-card-article-description" dangerouslySetInnerHTML={createMarkup(shortDescription)}>
              </h3>
             </Link>
            </div>
         
        </div>
        <div className="search-card-read-more">
          <Link to={`/story-view/${this.props.id}`}>Read more...</Link>
        </div>
        <div className="search-card-claps-and-responses">
          <div className="search-card-claps"> claps {this.props.clapsNum} </div>
          <div className="search-card-response-and-save">
            {this.props.commentNum} responses 
          </div>
        </div>
      </div>
    );
  }

}
 
export default SearchCard;