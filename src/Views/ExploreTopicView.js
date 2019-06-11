import React, { Component } from "react";
//import { Link } from "react-router-dom";
import MainHeader from "../components/MainHeader";
import ExploreTopicsComponent from "../components/ExploreTopicComponent";
import TopicHeaderBar from "../components/MainHeader/TopicHeader";

class ExploreTopicView extends Component {
  render() {
    return (
      <div className="explore-topics-view-main-div">
        <MainHeader />
        <TopicHeaderBar />
        <ExploreTopicsComponent />
      </div>
    );
  }
}

export default ExploreTopicView;
