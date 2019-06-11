import React from 'react';
import Moment from "react-moment";
import { IoIosThumbsUp } from 'react-icons/io';

const Comment = props => {
  return <div key={props.key} className="main-comment-render-body-div">
          
    <div className="comment-render-avatar-info-main-div">

      <img
        style={{ height: "50px", borderRadius: '50px', margin: '5px' }} src={props.img} alt="avatar"
      />

      <div id="comment-render-info">
        {props.name}
        <p>
          {props.Time}
        </p>
      </div>

    </div>
      
    <div className="main-comment-render-text">
      {props.body}
    </div>

    <span>
      <IoIosThumbsUp onClick={props.click}
      />
      {props.claps}
    </span>
  </div>

}

export default Comment;