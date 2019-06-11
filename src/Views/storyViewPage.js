import React from 'react';
import MainHeader from '../components/MainHeader';
import StoryRenderComponent from "../components/StoryRenderComponent";

function StoryReadView(){
    return(
      <div className="story-read-view-main-div">
        <MainHeader/>
        <StoryRenderComponent/>
      </div>
    )
}

export default StoryReadView;