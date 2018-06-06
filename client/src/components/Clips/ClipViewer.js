import React from 'react';
import { Wrapper, Clip } from './ClipViewer.style';

const ClipsViewer = props => {
  const { selectedClip } = props;
  return (
    <Wrapper>
      {selectedClip.embed_url && (
        <Clip
          src={selectedClip.embed_url}
          frameBorder="0"
          scrolling="no"
          allowFullScreen="true"
        />
      )}
    </Wrapper>
  );
};

export default ClipsViewer;
