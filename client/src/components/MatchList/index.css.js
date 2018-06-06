import styled from 'react-emotion';
import { mq } from '../../styles/breakpoints';

export const Container = styled('div')(props => {
  const { theme } = props;
  return mq({
    width: '100%',
    margin: 'auto',
    paddingTop: `${theme.spacingUnit * 4}px`,
    display: 'flex',
    flexDirection: 'column'
  });
});

export const MatchListHeader = styled('div')(props => ({
  display: 'flex',
  marginTop: '2rem',
  '& h2': {
    padding: '4px 8px',
    background: props.theme.colour.primaryDark
  }
}));
