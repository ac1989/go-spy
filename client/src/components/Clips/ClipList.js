import React from 'react';
import { Wrapper, NoScroll } from './ClipList.style';
import ClipListItem from './ClipListItem';

const ClipList = props => {
  const { clips, selectedClip } = props;
  return (
    <Wrapper>
      <NoScroll>
        {clips
          .slice(0, 10)
          .map(clip => (
            <ClipListItem
              isSelected={clip.slug === selectedClip.slug}
              key={clip.slug}
              clip={clip}
              onClick={props.onClick}
            />
          ))}
      </NoScroll>
    </Wrapper>
  );
};

export default ClipList;
