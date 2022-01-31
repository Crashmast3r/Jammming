import React from 'react';
import Track from '../Track/Track';
import './TrackList.css';
var isPlaying;

class TrackList extends React.Component {
    constructor(props) {
        super(props);
        this.onPreviewPlay = this.onPreviewPlay.bind(this);
        this.onPreviewStop = this.onPreviewStop.bind(this);
    }    
    
    onPreviewPlay(song) {
    if (isPlaying) {
      this.onPreviewStop(isPlaying);
    };
    console.log(isPlaying);
    song.play();
    isPlaying = song;
    console.log(isPlaying);
    setTimeout(() => {isPlaying = undefined}, 30000);
  }

  onPreviewStop(song) {
    song.pause();
  }

    render() {
        return (<div className="TrackList">
                 {
                     this.props.tracks.map(track => {
                         return <Track track={track} 
                                        key={track.id} 
                                        onAdd={this.props.onAdd} 
                                        onRemove={this.props.onRemove} 
                                        isRemoval={this.props.isRemoval} 
                                        onPlay={this.onPreviewPlay} 
                                        onStop={this.onPreviewStop} />
                     })
                 }
               </div>);
    }
}

export default TrackList;