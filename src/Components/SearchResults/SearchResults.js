import React from 'react';
import TrackList from '../TrackList/TrackList';
import './SearchResults.css';


class SearchResults extends React.Component {
  render() {
  return  (<div className="SearchResults">
            <h2>Results</h2>
            <TrackList tracks={this.props.searchResults} onAdd={this.props.onAdd} isRemoval={false} onPlay={this.props.onPlay} onStop={this.props.onStop} />
          </div>);
  }
}

export default SearchResults;