import React from 'react';
import FadeLeft from '../../transitions/FadeLeft';
import { Wrapper, Title, Details, Thumb, Stats } from './ClipListItem.style';

const ClipListItem = props => {
  const { clip, isSelected } = props;
  return (
    <FadeLeft>
      <Wrapper onClick={() => props.onClick(clip)} isSelected={isSelected}>
        <Title>{clip.title}</Title>
        <Details>
          <Thumb backgroundImage={clip.thumbnails.small} />
          <Stats>
            <p>{clip.broadcaster.name}</p>
            <p>{clip.views} Views</p>
          </Stats>
        </Details>
      </Wrapper>
    </FadeLeft>
  );
};

export default ClipListItem;
