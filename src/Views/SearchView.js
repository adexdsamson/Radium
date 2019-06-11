import React, { Component } from "react";
import MainHeader from "../components/MainHeader";
import SearchPage from "../components/SearchPage";

class SearchPageView extends Component {
  render() {
    return (
      <div className="search-page-view-main-div">
        <MainHeader />
        <SearchPage />
      </div>
    );
  }
}

export default SearchPageView;
