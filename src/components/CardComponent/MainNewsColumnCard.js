import React, { Component } from 'react';
import {
  IoIosBookmark
} from "react-icons/io"; //savedBookmark
import {
  MdBookmarkBorder
} from "react-icons/md"; //Unsavedbookmark
import swal from 'sweetalert';
//import reducer here
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import PopOver from '../subcomponent/popOver';

class NewaHomePageColumnCard extends Component {
 
  render() { 
    function createMarkup(str) {
      return {
        __html: str
      };
    }

    return ( 
      <div className="news-home-page-column-card-main-div">
        <div className="news-home-page-column-card-info">
          <h1>{this.props.articleTitle}</h1>
          <p dangerouslySetInnerHTML={createMarkup(this.props.body)} />
          <Link
            to={`/user/${this.props.userid}`}
            style={{ color: "black", opacity: ".56" }}
          >
            <PopOver
              activeUser={this.props.user}
              user={this.props}
              name={`${this.props.articleAuthorFirstName} ${
                this.props.articleAuthorLastName
              }`}
            >
              <p id="author-name">{`${this.props.articleAuthorFirstName} ${
                this.props.articleAuthorLastName
              }`}</p>
            </PopOver>
          </Link>
          <p id="time-stamp">
            <Moment format="MMM DD">{this.props.articleDate}</Moment>
          </p>
        </div>
        {this.props.saved ? (
          <div id="save-icon-column-home">
            <IoIosBookmark
              onClick={() =>
                this.props
                  .deleteFromReadingList(
                    this.props.user.id,
                    this.props.articleId
                  )
                  .then(response =>
                    this.props.getReadingList(this.props.user.id)
                  )
              }
              style={{ height: "25px", width: "25px" }}
            />
          </div>
        ) : (
          <div id="save-icon-column-home">
            <MdBookmarkBorder
              onClick={() => {
                if (!this.props.user.id) {
                  swal({
                    text: "Sign In to Access Your Personal Reading List",
                    
                  });
                } else {
                  this.props
                    .addToReadingList(this.props.user.id, this.props.articleId)
                    .then(response => {
                      console.log("Added", response);
                      this.props.getReadingList(this.props.user.id);
                    });
                }
              }}
              style={{ height: "25px", width: "25px" }}
            />
          </div>
        )}
        <div
          className="news-home-page-column-card-image"
          style={{
            height: "auto",
            width: "150px",
            backgroundImage: `url(${this.props.articleImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        />
      </div>
    );
  }
}
 
export default NewaHomePageColumnCard;