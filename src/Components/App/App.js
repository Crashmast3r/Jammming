import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';
import './App.css';
var isPlaying;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: 'New Playlist',
      playlistTracks: []
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.onPreviewPlay = this.onPreviewPlay.bind(this);
    this.onPreviewStop = this.onPreviewStop.bind(this);
    this.previewElement = React.createRef();
  }

  addTrack(track) {
    let tracks = this.state.playlistTracks;
    if (tracks.find(playlistTrack => playlistTrack.id === track.id)) {
      return;
    }
    tracks.push(track);
    this.setState({ playlistTracks: tracks });
  }

  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    let trackToRemove = tracks.findIndex((element) => element.id === track.id);
    tracks.splice(trackToRemove, 1);
    this.setState({ playlistTracks: tracks });
  }

  onPreviewPlay(song) {
    if (isPlaying) {
      this.onPreviewStop(isPlaying);
    };
    console.log(isPlaying);
    song.play();
    isPlaying = song;
    console.log(isPlaying);
    setTimeout(() => {isPlaying = 'none'}, 30000);
  }

  onPreviewStop(song) {
    song.pause();
    //isPlaying = 'none';
  }

  updatePlaylistName(name) {
    this.setState({ playlistName: name });
  }

  savePlaylist() {
    let trackURIs = [];
    this.state.playlistTracks.forEach((element) => trackURIs.push(element.uri));
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
    this.setState({
      playlistName: 'New Playlist', 
      playlistTracks: [] 
      })
    })
  }

  search(term) {
    Spotify.search(term)
    .then(results => {this.setState({ searchResults: results });
  })
}

render() {
  return (
    <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        <SearchBar onSearch={this.search} />
        <div className="App-playlist">
          <SearchResults searchResults={this.state.searchResults} 
                         onAdd={this.addTrack}
                         onPlay={this.onPreviewPlay}
                         onStop={this.onPreviewStop} />
          <Playlist playlistName={this.state.playlistName} 
                    playlistTracks={this.state.playlistTracks} 
                    onRemove={this.removeTrack} 
                    onNameChange={this.updatePlaylistName} 
                    onSave={this.savePlaylist} />
        </div>        
      </div>
    </div>);
  }
}

export default App;