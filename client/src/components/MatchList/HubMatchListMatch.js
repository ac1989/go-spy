import React from 'react';
import {
  Container,
  TeamName,
  TeamIcon,
  Map,
  Status,
  StreamCount,
  Live
} from './HubMatchListMatch.css';
import FadeUp from '../../transitions/FadeUp';

const HubMatchListMatch = props => {
  const { match } = props;
  const players = [...match.team1.roster, ...match.team2.roster];

  let streamCount = props.streamers.reduce((acc, streamer) => {
    const matchedPlayer = players.find(player => {
      return player.player_id === streamer.faceit.id;
    });
    if (matchedPlayer) {
      return acc + 1;
    }
    return acc;
  }, 0);

  return (
    <FadeUp>
      <Container map={match.maps && match.maps[0]}>
        <TeamIcon iconURL={match.team1.avatar} />
        <TeamName>{match.team1.name}</TeamName>
        <TeamIcon iconURL={match.team2.avatar} />
        <TeamName>{match.team2.name}</TeamName>
        <StreamCount>
          {streamCount} <Live>Live</Live>
        </StreamCount>
        <Map style={{ marginLeft: '4px' }}>
          {(match.maps && match.maps[0]) || 'no_map'}
        </Map>
        <Status>'{match.status}'</Status>
      </Container>
    </FadeUp>
  );
};

export default HubMatchListMatch;
