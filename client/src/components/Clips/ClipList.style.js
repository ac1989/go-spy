import styled from 'react-emotion';
import { mq } from '../../styles/breakpoints';

export const Wrapper = styled('div')(
  mq({
    width: ['100%', '100%', '192px', '312px', '332px'],
    height: ['100vh', '100vh', '405px', '540px', '810px'],
    overflow: 'hidden'
  })
);

export const NoScroll = styled('div')(
  mq({
    boxSizing: 'content-box',
    paddingRight: '17px',
    width: ['100%', '100%', '209px', '329px', '349px'],
    height: ['100vh', '100vh', '405px', '540px', '810px'],
    overflowY: 'scroll',
    overflowX: 'hidden'
  })
);
