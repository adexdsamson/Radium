import React, { Component } from 'react';
import NewsHompageColumnCard from '../CardComponent/MainNewsColumnCard';
import { Link } from "react-router-dom";
// Redux-react here...
//and also here..
import PopularFromNetworkContainer from '../CardContainer/PopularFromNetwork';

class NewHomePageColumnRender extends Component {
  constructor(props) {
    super(props);
    this.addToReadingList = this.addToReadingList.bind(this);
    this.state = {
      posts:[]
    }
  }

  createMarkup(str) {
    return { __html: str };
  }
  addToReadingList(userid, id) {
    this.props.addToReadingList(userid, id);
  }
  render() { 
    const postsList =
      this.state.posts.length > 0 ? (
        this.state.posts.map((article, i) => {
          let title = (
            <Link to={`/story-view/${article.id}`} style={{ color: "black" }}>
              <div
                dangerouslySetInnerHTML={this.createMarkup(article.title)}
                id="title-column-render"
              />
            </Link>
          );
          function trimmedBody(str) {
            let trimmed = str.substring(0, 100);
            if (trimmed.length === 100) {
              (trimmed += "...")
            } else {
              return trimmed
            }
          }
          const trimmedArticle = trimmedBody(article.body);
          let saved = false;
          if (this.props.readingList.find(val => val.id === article.id)) {
            saved = true;
          }
          return (
            <NewsHompageColumnCard
              articleTitle={title}
              articleDate={article.date}
              articleAuthorFirstName={article.firstname}
              articleAuthorLastName={article.lastname}
              articleAuthorAvatar={article.avatar}
              articleAuthorBio={article.bio}
              articleImg={article.thumbnailimg}
              addToReadingList={this.addToReadingList}
              articleId={article.id}
              userid={article.userid}
              body={trimmedArticle}
              saved={saved}
            />
          );
        })
      ) : (
          <div> loading...... </div>
      );
     return (
      <div className="news-home-page-column-render-main-div">
        <div className="news-home-page-column-main-articles">{postsList}</div>
        <div className="news-home-page-column-main-from-network-div">
          <PopularFromNetworkContainer />
        </div>
      </div>
    );
  }
}
 
export default NewHomePageColumnRender;