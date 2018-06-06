import React from 'react';
import { Container } from './TeamList.css';
import PlayerCard from './PlayerCard';

const TeamList = props => {
  return (
    <Container>
      {props.team.map(player => {
        return <PlayerCard player={player} key={player.player_id} />;
      })}
    </Container>
  );
};

export default TeamList;
