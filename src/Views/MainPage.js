import React, {
  Component
} from 'react';

import MainHeader from "../components/MainHeader";
import TopicHeader from '../components/MainHeader/TopicHeader';
import FeatureView from '../components/FeatureView';
//import NewsHomePageColumnRender from '../components/NewsHomePageColumeRender';

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }


  render() {
    return (
      <div className = "hompage-view-main-div" >
        <div className = "temp-nav" />
        <MainHeader />
        <TopicHeader className = "sticky" />
        <FeatureView />
      </div>
    );
  }
}

export default MainPage;