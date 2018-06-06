import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import {
  Container,
  Avatar,
  Details,
  PlayerName,
  LiveIndicator
} from './PlayerCard.css';

export class PlayerCard extends Component {
  setStream = streamer => {
    this.props.updateStreamURL(streamer.twitch.login_name);
  };

  isStreaming = player => {
    return this.props.streamers.find(
      streamer => streamer.faceit.id === player.player_id
    );
  };

  render() {
    const { player, currentStream } = this.props;
    const stream = this.isStreaming(player);
    let streamImg = '';
    if (stream) {
      streamImg = stream.twitch.stream.thumbnail_url
        .replace('{width}', '266')
        .replace('{height}', '160');
    }
    return (
      <Container
        isStreaming={stream ? true : false}
        isCurrentStreamer={stream && stream.twitch.login_name === currentStream}
        onClick={() => {
          if (stream) this.setStream(stream);
        }}
        streamImg={streamImg}
      >
        <Avatar avatar={player.avatar} />
        <Details>
          <PlayerName>{player.nickname}</PlayerName>
          {stream && <LiveIndicator>Live</LiveIndicator>}
        </Details>
      </Container>
    );
  }
}

const mapStateToProps = ({ stream, streamers }) => ({
  currentStream: stream,
  streamers
});

export default connect(mapStateToProps, actions)(PlayerCard);
