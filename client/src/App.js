import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import * as actions from './actions';
import { ThemeProvider } from 'emotion-theming';
import { injectGlobal } from 'emotion';
import styled from 'react-emotion';
import { theme } from './styles/theme';
import { mq } from './styles/breakpoints';
import globalStyles from './styles/global';
import Header from './components/Header';
import background from './images/backgrounds/go-spy-background.jpg';
import MatchList from './components/MatchList';
import LiveMatch from './components/LiveMatch';
import Clips from './components/Clips';
import Toast from './components/Toast';

injectGlobal(globalStyles);

const Container = styled('div')(
  mq({
    width: ['100%', '600px', '920px', '1280px', '1780px'],
    margin: 'auto'
  })
);

const Background = styled('div')(
  mq({
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    minHeight: '100vh',
    background: `url(${background})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    zIndex: '-100'
  })
);

class App extends Component {
  componentDidMount() {
    this.props.fetchStreamers();
    this.updateResources = setInterval(() => {
      this.props.fetchStreamers();
    }, 30000);
  }

  componentWillUnmount() {
    clearInterval(this.updateResources);
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <Router>
          <Container>
            <Background />
            <Route path="/*" component={Header} />
            <Route path="/clips" component={Clips} />
            <Route exact path="/" component={MatchList} />
            <Route path="/match/:id" component={LiveMatch} />
            <Toast autoHideDuration={6000} />
          </Container>
        </Router>
      </ThemeProvider>
    );
  }
}

export default connect(null, actions)(App);
