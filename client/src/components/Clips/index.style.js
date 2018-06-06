import styled from 'react-emotion';
import { mq } from '../../styles/breakpoints';

export const Wrapper = styled('div')(props => {
  const { theme } = props;
  return mq({
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: ['column', 'column', 'row'],
    marginTop: [
      `${theme.spacingUnit}px`,
      `${theme.spacingUnit}px`,
      `${theme.spacingUnit}px`,
      `${theme.spacingUnit}px`,
      `${theme.spacingUnit * 3}px`
    ]
  });
});
