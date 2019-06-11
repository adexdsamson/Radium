import React, { Component } from 'react';
import {IoIosNotifications} from "react-icons/io/index";
import {IoIosSearch} from "react-icons/io";
import logoLarge from "../../assets/mediumlogolarge.svg";
import {
  Link
} from "react-router-dom";
import "./index.css";
import { APP_REGISTER } from '../../Routes/route';
import { connect } from "react-redux";
import { getAllPosts } from '../../store/reducer';
import ImageIcon from "./ImageIcon";
import PropTypes from 'prop-types';


class MainHeader extends Component {
  constructor() {
    super();
    this.state = {
      userInput: "",
      following: []
    };
    this.focusMethod = this.focusMethod.bind(this);
  }
  static contextTypes = {
    router: PropTypes.object
  };

  componentDidMount() {
    this.props.getAllPosts();
    var input = document.getElementById("SearchBar");
    const that = this;
    input.addEventListener("keyup", function (event) {
      //Update userInput onchange of input searchbar value
      that.setState({
        userInput: event.target.value
      });
      event.preventDefault();
      if (event.keyCode === 13) {
        //Route to new search result page
        that.props.history.push(`/search?q=${that.state.userInput}`);
      }
    });
  }

  focusMethod() {
    if (document.getElementById("SearchBar").focus()) {
      return;
    }
    document.getElementById("SearchBar").focus();
  }

  render() {
    let loggedin = this.props.auth ? (
      <ImageIcon />
    ) : (
      <button className="sign-in-btn">
        <Link to={ APP_REGISTER } style={{color:'#018f69'}}>
          Sign In
        </Link>
      </button>
    );
    let writelog = this.props.auth ? (
      <button className="sign-in-btn">
        <Link to="/new-story" style={{ color: '#018f69' }}>
          Write Story
        </Link>
      </button>
    ) : (
      <div>
        <button className="sign-in-btn" disabled> Write Story </button>
      </div>
    );

    return ( 
      <div className="main-header-component-main-div">
        <div style={{ height: '100%', width: '20%', display: 'flex', alignItems: 'center' }}>
          {writelog}
        </div>

        
        <div className="main-header-logo-div">
          <Link to="/">
            <img src={logoLarge} alt="..." className="logo-large" />
          </Link>
        </div>
        

        <div className="main-header-icon-user-div">
          <div className="search-and-icon">
            <div>
              <IoIosSearch
                className="story-header-icons"
                onClick={
                  this.state.userInput 
                    ? () => {
                      this.props.history.push(
                        `/search?q=${this.state.userInput}`
                      );
                    }
                    : () => this.focusMethod()
                }
              />
            </div>
            <div>
              <input
                className="SearchBar"
                id="SearchBar"
                type="search"
                name="SearchBar"
                placeholder="Search"
              />
            </div>
          </div>
          <div className="book-and-note">
            {this.props.auth ? (
              <IoIosNotifications className = "story-header-icons" />
            ) : (
              false
            )}
            {loggedin}
          </div>
        </div>
      </div>
     );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}
export default connect(mapStateToProps, {
  getAllPosts
})(MainHeader);