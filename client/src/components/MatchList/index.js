import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { matchesByHub, streamers } from '../../selectors';
import { Container, MatchListHeader } from './index.css';
import { theme } from '../../styles/theme';
import HubMatchList from './HubMatchList';
import OrbTwinStrafing from '../Loaders/OrbTwinStrafing';

export class MatchList extends Component {
  handleClick = () => {
    this.props.fetchMatches();
  };

  componentDidMount() {
    this.props.fetchMatches();
    this.updateMatches = setInterval(() => {
      this.props.fetchMatches();
    }, 30000);
  }

  componentWillUnmount() {
    clearInterval(this.updateMatches);
  }

  renderMatchListHubs = () => {
    const { items, isLoading } = this.props.matches;
    const { streamers } = this.props;

    return (
      <div style={{ position: 'relative' }}>
        <OrbTwinStrafing
          show={isLoading}
          orbSize={48}
          speed={1600}
          backgroundOpacity={0.5}
          orbColors={[theme.colour.primary, theme.colour.secondary]}
          unmountOnExit
        />
        {!isLoading &&
          Object.keys(items).length < 1 && (
            <div style={{ marginTop: '16px' }}>Nobody is playing...</div>
          )}
        {Object.keys(items).map(hub => {
          return (
            <HubMatchList
              key={hub}
              hubName={hub}
              matches={items[hub]}
              streamers={streamers}
            />
          );
        })}
      </div>
    );
  };

  render() {
    return (
      <Container>
        <MatchListHeader>
          <h2>
            Live Games{' '}
            <i
              className="material-icons"
              onClick={this.handleClick}
              style={{ cursor: 'pointer' }}
            >
              refresh
            </i>
          </h2>
        </MatchListHeader>
        {this.renderMatchListHubs()}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  matches: matchesByHub(state),
  streamers: streamers(state)
});

export default connect(mapStateToProps, actions)(MatchList);
