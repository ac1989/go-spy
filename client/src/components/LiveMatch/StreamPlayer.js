import React from 'react';
import { Stream, NoStream } from './StreamPlayer.css';

const StreamPlayer = props => {
  if (props.stream) {
    return (
      <Stream
        src={`http://player.twitch.tv/?channel=${props.stream}`}
        width="960"
        height="540"
        frameBorder="0"
        scrolling="no"
        allow="autoplay; encrypted-media"
        allowFullScreen
        style={{ display: 'block' }}
      />
    );
  } else {
    return <NoStream>Nobody is streaming this match...</NoStream>;
  }
};

export default StreamPlayer;
