import React from "react";
import TopicCard from "./TopicCard";
//import TabHeading from '../subcomponent/TabHeader';
import { connect } from "react-redux";
import { getCategories, getUserDetails } from "../../store/reducer";
import { Link } from 'react-router-dom';
//import { authRef } from "../../utilities/firebase";

class ExploreTopicsComponent extends React.Component {
  

  componentDidMount() {
    this.props.getCategories();
    //this.props.getUserDetails();
    
  }
  render() {
    let topicReel =
      this.props.categories.length > 0
        ? this.props.categories.map((val) => {
            return (
              <TopicCard
                name={val.name}
                key={val.name}
                img={val.image}
                id={val.id}
                className="topic-card"
              />
            );
          })
        : "Loading";
      //console.log(this.props.user)
    return (
      <div className="explore-topics-main-div">
        <div className="explore-topics-main-title">Explore Topics</div>
        
        <div className="topic-card-gallery">{topicReel}</div>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, { getCategories, getUserDetails })(
  ExploreTopicsComponent
);
