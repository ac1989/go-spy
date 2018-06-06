import styled from 'react-emotion';
import { mq } from '../../styles/breakpoints';
import { Link } from 'react-router-dom';

export const Wrapper = styled('div')(props => {
  const { theme } = props;
  return mq({
    display: 'flex',
    width: '100%',
    marginTop: [
      `${theme.spacingUnit}px`,
      `${theme.spacingUnit}px`,
      `${theme.spacingUnit * 3}px`,
      `${theme.spacingUnit * 4}px`,
      `${theme.spacingUnit * 5}px`
    ],
    marginBottom: [
      `${theme.spacingUnit}px`,
      `${theme.spacingUnit}px`,
      `${theme.spacingUnit * 2}px`,
      `${theme.spacingUnit * 3}px`,
      `${theme.spacingUnit * 4}px`
    ]
  });
});

export const NavButton = styled(Link)(props => {
  const { theme, isCurrentPath } = props;
  return mq({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100px',
    height: '40px',
    marginRight: '8px',
    background: theme.colour.primaryDark,
    borderBottom: isCurrentPath
      ? `4px solid ${theme.colour.secondaryDark}`
      : `4px solid ${theme.colour.primary}`,
    textDecoration: 'none',
    outline: 'none',
    transition: 'all 0.3s ease-out',
    boxShadow: theme.boxShadow,
    '&:hover': {
      borderBottom: isCurrentPath
        ? `4px solid ${theme.colour.secondaryDark}`
        : `4px solid ${theme.colour.primary}`,
      background: theme.colour.primary
    }
  });
});
