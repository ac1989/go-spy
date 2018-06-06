import styled from 'react-emotion';
import { mq } from '../../styles/breakpoints';

export const Container = styled('div')(props =>
  mq({
    marginBottom: '32px'
  })
);

export const Header = styled('div')(props => {
  const { theme } = props;

  return mq({
    display: 'inline-block',
    padding: '8px',
    marginTop: `${theme.spacingUnit * 2}px`,
    marginBottom: `${theme.spacingUnit}px`,
    background: theme.colour.primaryDark
  });
});
