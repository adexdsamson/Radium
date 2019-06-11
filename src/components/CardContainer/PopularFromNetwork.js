import React, { Component } from 'react';
import FromNetworkCard from '../CardComponent/FromNetworkCard';
//connect to redux 
//import reducer
import readingListImg from '../../assets/readingListImg.png';

class PopularFromNetworkContainer extends Component {
  
  render() { 
    const savedList = !this.props.readingList
      ? "Loading..."
      : this.props.readingList.map((article, i) => {
          console.log(article);
          return (
            <FromNetworkCard
              key={i}
              articleTitle={article.title}
              articleIndex={i + 1}
              articleid={article.id}
              date={article.date}
              thumbnail={article.thumbnailimg}
            />
          );
        });
    return ( 
      <div className="popular-network-container-main-div">
        <div className="reading-list-header">
          <h1>Reading List</h1>
          < img src = {
            readingListImg
          }
          alt = "..."
          style = {
            {
              height: "100%"
            }
          }
          />
        </div>
        {savedList.slice(0, 4)}
      </div>
    );
  }
}
 
export default PopularFromNetworkContainer;