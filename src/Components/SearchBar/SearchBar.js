import React from 'react';
import './SearchBar.css';


class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchTerm: '' };
    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  search() {
    this.props.onSearch(this.state.searchTerm);
  }

  handleTermChange(e) {
    this.setState({ searchTerm: e.target.value });
  }

  handleKeyDown(e) {
    if(e.key === 'Enter') {
      this.search();
    }
  }

  render() {
  return  (<div className="SearchBar">
            <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange} onKeyDown={this.handleKeyDown} />
            <button className="SearchButton" onClick={this.search}>SEARCH</button>
          </div>);
  }
}

export default SearchBar;