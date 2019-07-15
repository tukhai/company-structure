import React from 'react';
import { Link } from 'react-router-dom';

import PackageResultTable from './components/PackageResultTable.js';

const EMPLOYEES_LIST = [
  "John Hartman", "Samad Pitt", "Aila Hodgson", "Amaya Knight", "Leanna Hogg", "Vincent Todd", 
  "Faye Oneill", "Lynn Haigh", "Nylah Riddle"
];

class EmployeeDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      packageResultData: [],
      employeeName: "",
      isFetchingCompleted: false
    }
    this.handleListItemClick = this.handleListItemClick.bind(this);
  }

  handleListItemClick(itemName) {
    window.location.href = `/employee-details/${itemName}`;
  }

  componentDidMount() {
    var employeeNameFromUrl = "";
    if (this.props.location && this.props.location.pathname) {
      employeeNameFromUrl = this.props.location.pathname.replace("/employee-details/", "");
    }
    if (EMPLOYEES_LIST.indexOf(employeeNameFromUrl) === -1) {
      window.location.href = "/";
    }

    var fetchUrl = `https://cors-anywhere.herokuapp.com/http://api.additivasia.io/api/v1/assignment/employees/${employeeNameFromUrl}`;

    fetch(fetchUrl,
    {
      method: 'GET',
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson) {
        this.setState({
          packageResultData: (responseJson[1] && responseJson[1]["direct-subordinates"]) ? responseJson[1]["direct-subordinates"] : [],
          employeeName: employeeNameFromUrl,
          isFetchingCompleted: true
        });
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }

  render() {
    var subordinatorsCounter = 0;
    if (this.state.packageResultData && this.state.packageResultData.length > 0) {
      subordinatorsCounter = this.state.packageResultData.length;
    }

    return (
        <div className="App">
          <h4 className="back-to-home-page"><Link to="/">EMPLOYEE EXPLORER</Link></h4>

          <div className="main-container">
            <h2>EMPLOYEE OVERVIEW</h2>
            <div className="package-name">{this.state.employeeName}</div>

            <h4 className="package-result-counter">
              {this.state.isFetchingCompleted ?
                <div>Found {subordinatorsCounter} subordinators for "{this.state.employeeName}"</div>
                :
                <div className="loading-icon-container">
                  <div className="fetching-text">Fetching..</div>
                </div>
              }
            </h4>

            <div className="clear-both"></div>

            <PackageResultTable
              dependenciesData = {this.state.packageResultData}
              onListItemClick = {this.handleListItemClick}
            />
          </div>
        </div>
      );
  }
}
export default EmployeeDetails