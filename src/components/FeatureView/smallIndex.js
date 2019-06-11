import React from 'react';
import { Link } from 'react-router-dom';
import smartTruncate from 'smart-truncate';
import PopOver from '../subcomponent/popOver';
import './create'


const SmallFeatureView = props => {
  
  return (
    <div className="small-picture grid-a">
      <Link to={`/story-view/${props.Posts}`}>
        <div
          className="featured-small-picture picture-a"
          style={{
            backgroundImage: `url(${
              props.img
            })`
          }}
        />
      </Link>
      <div className="small-picture-text">
        <Link to={`/story-view/${props.id}`}>
          <div
            className="featured-small-card-title"
            dangerouslySetInnerHTML={this.createMarkup(props.title)}
          />
          <div
            className="featured-card-text"
            dangerouslySetInnerHTML={this.createMarkup(
              smartTruncate(props.body, 100)
            )}
          />
        </Link>
        <Link
          style={{ color: "black", opacity: ".56" }}
          to={`/user/${props.id}`}
        >
          <PopOver
            activeUser={this.props.user}
            user={props.Posts[0]}
            name={props.name}
          >
            <h6>{props.name}</h6>
          </PopOver>
        </Link>
      </div>
    </div>
  )
}
export default SmallFeatureView;