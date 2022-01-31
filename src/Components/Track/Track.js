import React from 'react';
import './Track.css';

class Track extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isPlaying: 'not-playing' };
        this.handleClick = this.handleClick.bind(this);
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
    }

    renderAction() {
        if (this.props.isRemoval) {
            return <button className="Track-action" onClick={this.removeTrack}>-</button>;
        } else {
            return <button className="Track-action" onClick={this.addTrack}>+</button>;
        }
    }

    addTrack() {
        this.props.onAdd(this.props.track);
    }

    removeTrack() {
        this.props.onRemove(this.props.track);
    }

    handleClick() {
        var song = document.getElementById(this.props.track.id + '1');
        if (this.state.isPlaying === 'not-playing') {
            this.setState({ isPlaying: 'playing' });
            this.props.onPlay(song);
            setTimeout(() => {
                if (this.state.isPlaying === 'playing') {
                    this.setState({ isPlaying: 'not-playing' });
                }
            }, 30000);
        } else {
            this.setState({ isPlaying: 'not-playing' });
            this.props.onStop(song);
        }
    }

    changePlayState() {
        if (this.state.isPlaying === 'playing') {
            this.setState({ isPlaying: 'not-playing' });
        };
    }

    render() {
        return  (<div className="Track">
                    <div className="Track-information">
                        <h3>{this.props.track.name}</h3>
                        <p>{this.props.track.artist} | {this.props.track.album}</p>
                    </div>
                    <div className={`previewButton ${this.state.isPlaying}`} onClick={this.handleClick}>
                        <audio id={`${this.props.track.id}1`}src={this.props.track.preview_url} hidden="hidden"></audio>
                    </div>
                    {this.renderAction()}
                </div>);
    }
}

export default Track;