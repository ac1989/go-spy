import styled from 'react-emotion';
import { mq } from '../../styles/breakpoints';

export const Wrapper = styled('div')(props => {
  const { theme, isSelected } = props;
  return mq({
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'content-box',
    width: ['110%', '110%', '100%'],
    marginBottom: `${theme.spacingUnit}px`,
    background: theme.colour.primaryDark,
    borderBottom: isSelected
      ? `4px solid ${theme.colour.secondaryDark}`
      : `4px solid ${theme.colour.primary}`
  });
});

export const Title = styled('h4')(props => {
  const { theme } = props;
  return mq({
    padding: theme.spacingUnit,
    background: 'rgba(0, 0, 0, 0.5)'
  });
});

export const Thumb = styled('div')(props => {
  const { backgroundImage } = props;
  return mq({
    width: '120px',
    height: '80px',
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  });
});

export const Details = styled('div')(props => {
  const { theme } = props;
  return {
    padding: `${theme.spacingUnit}px`,
    display: 'flex',
    flexDirection: 'row'
  };
});

export const Stats = styled('div')(props => {
  const { theme } = props;
  return mq({
    '& p': {
      marginLeft: `${theme.spacingUnit}px`,
      marginBottom: `${theme.spacingUnit}px`
    }
  });
});
