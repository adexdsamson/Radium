import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./index.css";
import SearchCard from "./SearchCard";
import { connect } from "react-redux";
import { getAllPosts } from "../../store/reducer";


class SearchPage extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      userInput: "",
      filterString: ""
    };
  }
  componentDidMount() {
    //Separate search term from query string
    let queryArray = this.props.location.search.split("=");
    let that = this;
    //search filter function to find only posts which contain
    const filter = function (posts, searchString) {
      let searchTerms = that.props.location.search
        ? searchString
          .toLowerCase()
          .split("%20")
          .join(" ")
          .split(" ")
        : false;
      let returnPosts = posts.filter(val => {
        for (let i = 0; i < searchTerms.length; i++) {
          if (
            val.title.toLowerCase().includes(searchTerms[i]) ||
            val.firstname.toLowerCase().includes(searchTerms[i]) ||
            val.lastname.toLowerCase().includes(searchTerms[i])
          ) {
            return true;
          }
        }
      });
      return returnPosts;
    };

    //this.props.getAllPosts().then(response => {
     //this.setState({ posts: filter(this.props.posts, queryArray[1]) });
   // });
    this.setState({ userInput: queryArray[1], filterString: queryArray[1] });

    //add event listener for the enter key on the search input bar
    var input = document.getElementById("BigSearchBar");

    input.addEventListener("keyup", function (event) {
      //Update userInput onchange of input searchbar value
      that.setState({ userInput: event.target.value });
      event.preventDefault();
      if (event.keyCode === 13) {
        //Route to new search result page
        that.props.history.push(`/search?q=${that.state.userInput}`);
        let queryArray = that.props.location.search.split("=");
        that.setState({
          filterString: that.state.userInput,
          posts: filter(that.props.posts, queryArray[1].split(" ").join("%20"))
        });
      }
    });
  }

  createMarkup(str) {
    return { __html: str };
  }

  render() {
     //console.log("this is val",this.state.posts)
    let searchReel =
      this.state.filterString !== "" &&
        this.props.location.search &&
        this.state.posts.length > 0
        ? this.state.posts.map((val, index) => {
         

          return <SearchCard
            authorName={`${val.firstname} ${val.lastname}`}
            body={val.body}
            title={val.title}
            img={val.img}
            date={val.date}
            key={index}
            id={val.id}
            avatar={val.photoURL}
            userid={val.userid}
            commentNum={val.numofcomments}
            clapsNum={val.rating}
          />
        }
        )
        : "";

    return (
      <div className="search-page-main-div">
        <h1>Search</h1>

        <input
          autoFocus={true}
          defaultValue={
            this.props.location.search
              ? this.props.location.search
                .split("=")[1]
                .split("%20")
                .join(" ")
              : "Search"
          }
          placeholder={"Search"}
          type="search"
          name="BigSearchBar"
          className="BigSearchBar"
          id="BigSearchBar"
        />
        <div className="search-page-stories-div">
          {searchReel}
        </div>
        
      </div>
    );
  }
}
 
const mapStateToProps = state => state;

export default withRouter(
  connect(mapStateToProps, { getAllPosts })(SearchPage)
);
