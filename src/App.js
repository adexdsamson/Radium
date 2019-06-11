import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from "react-redux";
import { fetchUser } from './store/reducer';
import AddStoryView from "./Views/AddStory";
import HomePageView from "./Views/MainPage";
//import Login from './Views/Login';
import Register from './Views/Register';
//import ResetPassword from './Views/ResetPassword';
import StoryReadView from "./Views/storyViewPage";
import ExploreTopicsView from "./Views/ExploreTopicView";
import ProfilePageView from "./Views/ProfilePage";
import CategoryView from "./Views/CategoryView";
import OtherProfileView from "./Views/OtherProfile";
import SearchPageView from "./Views/SearchView";
import * as Routes from './Routes/route';
import Private from './Routes/private';


class App extends Component {
  componentWillMount() {
    this.props.fetchUser();
  }
  
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route
              exact
              path={Routes.APP}
              component={HomePageView}
            />
            
            <Route
              path={Routes.APP_NEW_STORY}
              component={Private(AddStoryView)}
            />

            <Route
              path={Routes.APP_REGISTER}
              component={Register}
            />

            <Route
              path={Routes.APP_USER_ID}
              component={Private(ProfilePageView)}
            />

            <Route
              path={Routes.APP_Other_USER_ID}
              component={OtherProfileView}
            />

            <Route
              path={Routes.APP_TOPIC_ID}
              component={Private(CategoryView)}
            />

            <Route
              path={Routes.APP_SEARCH}
              component={Private(SearchPageView)}
            />

            <Route
              path={Routes.APP_TOPIC}
              component={Private(ExploreTopicsView)}
            />

            <Route
              path={Routes.APP_STORY_VIEW}
              component={Private(StoryReadView)}
            />
          </Switch>
        </Router>    
      </div>
    );
  }
}

export default connect(null, { fetchUser })(App);
