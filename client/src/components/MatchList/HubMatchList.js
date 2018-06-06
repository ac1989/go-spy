import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Header } from './HubMatchList.css';
import HubMatchListMatch from './HubMatchListMatch';

const HubMatchList = props => {
  return (
    <Container>
      <Header>{props.hubName} Matches</Header>
      {props.matches.map(match => (
        <Link
          key={match.match_id}
          to={`match/${match.match_id}`}
          style={{ textDecoration: 'none' }}
        >
          <HubMatchListMatch match={match} streamers={props.streamers} />
        </Link>
      ))}
    </Container>
  );
};

export default HubMatchList;
