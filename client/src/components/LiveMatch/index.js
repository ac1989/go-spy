import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Container, Row, StatusBar } from './index.css';
import TeamList from './TeamList';
import StreamPlayer from './StreamPlayer';
import MatchStatus from './MatchStatus';
import MatchStartedAt from './MatchStartedAt';

export class LiveMatch extends Component {
  componentDidMount() {
    this.props.fetchMatch(this.props.match.params.id);
    this.updateMatch = setInterval(() => {
      this.props.fetchMatch(this.props.match.params.id);
    }, 15000);
  }

  setInitialStream = () => {
    const { selectedMatch } = this.props;
    if (!selectedMatch.isLoading) {
      const players = [
        ...selectedMatch.team1.roster,
        ...selectedMatch.team2.roster
      ];
      const firstFoundStream = this.props.streamers.find(streamer => {
        return players.find(player => streamer.faceit.id === player.player_id);
      });
      if (firstFoundStream) {
        this.props.updateStreamURL(firstFoundStream.twitch.login_name);
      }
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (!this.props.stream && this.props.selectedMatch) {
      this.setInitialStream();
    }
  }

  componentWillUnmount() {
    this.props.updateStreamURL('');
    clearInterval(this.updateMatch);
  }

  render() {
    if (!this.props.selectedMatch) return <div />;
    const { selectedMatch, stream } = this.props;
    const { team1, team2, status, configured_at, started_at } = selectedMatch;
    return (
      <Container flexDirection={'column'}>
        {!selectedMatch.isLoading && (
          <React.Fragment>
            <Row>
              <TeamList team={team1.roster} />
              <StreamPlayer stream={stream} />
              <TeamList team={team2.roster} />
            </Row>

            <StatusBar>
              <MatchStatus status={status} />
              <MatchStartedAt
                configuredAt={configured_at}
                startedAt={started_at}
              />
            </StatusBar>
          </React.Fragment>
        )}
      </Container>
    );
  }
}

const mapStateToProps = ({ matches, streamers, stream }, ownProps) => ({
  selectedMatch: matches.items.find(
    match => match.match_id === ownProps.match.params.id
  ),
  streamers,
  stream
});

export default connect(mapStateToProps, actions)(LiveMatch);
