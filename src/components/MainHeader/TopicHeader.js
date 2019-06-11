import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { connect } from 'react-redux';
import { getCategories } from '../../store/reducer';
import PropTypes from 'prop-types';

class TopicHeader extends Component {

  static contextTypes = {
    router: PropTypes.object
  };

  componentDidMount() {
    this.props.getCategories();
  }
  
  
  render() { 
    const capitalizeAll = str => {
      return str.toUpperCase();
    };

    const categoryReel = 
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
    return ( 
       <div className="topic-header-bar-main-div">
        <div className="topic-header-bar">
         
          <div id="topic-header-grid" className="topic-header-grid">
            <Link to={"/"} className="topic-nav-link">
              HOME
            </Link>
            {categoryReel}
           
          </div>
        </div>
      </div>
    );
  }
}

 
const mapStateToProps = state => state;

export default connect(mapStateToProps, {
  getCategories
})(TopicHeader);