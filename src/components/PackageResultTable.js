import React from 'react';

class SearchPanel extends React.Component {
  constructor(props) {
    super(props);
    this.handleListItemClick = this.handleListItemClick.bind(this);
  }

  handleListItemClick(itemName) {
    if (typeof this.props.onListItemClick === "function") {
      this.props.onListItemClick(itemName);
    }
  }

  render() {
    var dependenciesData = this.props.dependenciesData;

    var dependenciesDataUI = () => {
      return dependenciesData.map((i, index) => {
        return (
          <div key={index} onClick={() => this.handleListItemClick(i)}>
            <li><div>{i}</div></li>
          </div>
        );
      });
    }

    return (
      <div>
        <ul id="myUL">
          {dependenciesDataUI()}
        </ul>
      </div>
    );
  }
}

 export default SearchPanel;