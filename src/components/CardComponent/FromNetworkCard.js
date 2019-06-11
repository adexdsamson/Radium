import React from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";

function FromYourNetworkSmallCard(props) {
  function createMarkup(str) {
    return { __html: str };
  }

  return (
    <div className="from-network-small-card-main-div">
      <div className="user-image article-index">{`0${props.articleIndex}`}</div>
      <div className="user-info-from-network">
        <Link to={`/story-view/${props.articleid}`}>
          <h4 dangerouslySetInnerHTML={createMarkup(props.articleTitle)} />
        </Link>
        <p>
          <Moment format="MMM DD">{props.date}</Moment>
        </p>
      </div>
    </div>
  );
}
export default FromYourNetworkSmallCard;
