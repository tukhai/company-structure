import React, { Component } from 'react';
import './App.css';

import SearchPanel from './components/SearchPanel.js';

const EMPLOYEES_LIST = [
  "John Hartman", "Samad Pitt", "Aila Hodgson", "Amaya Knight", "Leanna Hogg", "Vincent Todd", 
  "Faye Oneill", "Lynn Haigh", "Nylah Riddle"
];

class App extends Component {
  constructor(props) {
    super(props);

    var searchHistoryArr = JSON.parse(localStorage.getItem("searchHistory"));

    this.state = {
      searchKeywords: "",
      searchSuggestionPackagesData: searchHistoryArr
    }
    this.handleOnChangeKeywords = this.handleOnChangeKeywords.bind(this);
    this.handleSearchButtonClick = this.handleSearchButtonClick.bind(this);
    this.handleSelectSuggestion = this.handleSelectSuggestion.bind(this);
  }

  handleOnChangeKeywords(value) {
    this.setState({
      searchKeywords: value
    });
  }

  handleSelectSuggestion(suggestionName) {
    console.log("suggestionName", suggestionName);
    this.setState({
      searchKeywords: suggestionName,
      // searchSuggestionPackagesData: []
    });
  }

  handleSearchButtonClick() {
    if (this.state.searchKeywords !== "" && EMPLOYEES_LIST.indexOf(this.state.searchKeywords) > -1) {
      var searchHistoryArr = JSON.parse(localStorage.getItem("searchHistory"));
      if (searchHistoryArr && searchHistoryArr.length > 0) {
        if (searchHistoryArr.length >= 5) searchHistoryArr.shift();
        searchHistoryArr.push(this.state.searchKeywords);
      } else {
        searchHistoryArr = [this.state.searchKeywords];
      }

      localStorage.setItem("searchHistory", JSON.stringify(searchHistoryArr));

      var encodedName = encodeURI(this.state.searchKeywords);
      var directedUrl = `http://api.additivasia.io/api/v1/assignment/employees/${encodedName}`;

      console.log("directedUrl", directedUrl);
    } else {
      alert("Employee name does not exist in the data!");
    }
  }

  render() {
    return (
      <div className="App">
        <div className="main-container">
          <h2>EMPLOYEE EXPLORER</h2>

          <SearchPanel
            onOnChangeKeywords = {this.handleOnChangeKeywords}
            onSearchButtonClick = {this.handleSearchButtonClick}
            searchSuggestionPackagesData = {this.state.searchSuggestionPackagesData}
            onSelectSuggestion = {this.handleSelectSuggestion}
            searchKeywords = {this.state.searchKeywords}
          />
        </div>
      </div>
    );
  }
}

export default App;
