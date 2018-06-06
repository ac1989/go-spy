import React, { Component } from 'react';
import { connect } from 'react-redux';
import ClipViewer from './ClipViewer';
import ClipList from './ClipList';
import { Wrapper } from './index.style';
import * as actions from '../../actions';

class Clips extends Component {
  componentDidMount() {
    this.props.fetchClips();
  }

  render() {
    const { clips, selectedClip } = this.props.clips;
    return (
      <Wrapper>
        <ClipViewer selectedClip={selectedClip} />
        <ClipList
          clips={clips}
          selectedClip={selectedClip}
          onClick={this.props.setSelectedClip}
        />
      </Wrapper>
    );
  }
}

const mapStateToProps = ({ clips }) => ({ clips });

export default connect(mapStateToProps, actions)(Clips);
