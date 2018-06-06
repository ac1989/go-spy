import styled from 'react-emotion';
import { mq } from '../../styles/breakpoints';

export const Wrapper = styled('div')(props => {
  const { theme } = props;
  return mq({
    position: 'relative',
    paddingTop: ['56.25%', '56.25%', 0],
    width: ['100%', '100%', 0],
    height: 0,
    marginBottom: `${theme.spacingUnit}px`
  });
});

export const Clip = styled('iframe')(
  mq({
    position: ['absolute', 'absolute', 'relative'],
    top: [0, 0, 'none'],
    width: ['100%', '100%', '720px', '960px', '1440px'],
    height: ['100%', '100%', '405px', '540px', '810px']
  })
);
