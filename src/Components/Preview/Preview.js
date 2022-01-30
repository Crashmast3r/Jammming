import React from 'react';
import './Preview.css';

class Preview extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isPlaying: 'not-playing' };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        var song = document.getElementById(this.props.id);
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

    render() {
        return (
            <div className={`previewButton ${this.state.isPlaying}`} onClick={this.handleClick}>
                <audio id={this.props.id}src={this.props.preview} hidden="hidden"></audio>
            </div>
        );
    }
}

export default Preview;