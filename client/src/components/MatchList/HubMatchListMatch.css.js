import styled from 'react-emotion';
import { mq } from '../../styles/breakpoints';
import { monoSpan, monoSpanYellow } from '../../styles/typography';
import avatars from '../../images/avatars';
import bars from '../../images/bars';

export const Container = styled('div')(props => {
  const { theme } = props;
  return mq({
    display: 'flex',
    width: '100%',
    height: '44px',
    marginBottom: '4px',
    padding: '4px',
    borderBottom: `4px solid ${theme.colour.primaryDark}`,
    boxShadow: theme.boxShadow,
    background: bars[props.map]
      ? `url(${bars[props.map]})`
      : `url(${bars.de_voting})`
  });
});

const determineTeamIcon = iconURL => {
  if (!iconURL || iconURL.includes('default-profile')) {
    return `url(${avatars.default_avatar_32})`;
  }
  return `url(${iconURL})`;
};

export const TeamIcon = styled('div')(props =>
  mq({
    display: ['none', 'none', 'block'],
    width: '32px',
    height: '32px',
    backgroundImage: determineTeamIcon(props.iconURL),
    backgroundSize: 'cover'
  })
);

export const TeamName = styled('div')(
  props => monoSpan,
  mq({
    display: 'flex',
    width: ['120px', '200px'],
    height: '32px',
    marginLeft: '4px',
    marginRight: '4px'
  })
);

export const StreamCount = styled('span')(monoSpan, { marginLeft: 'auto' });

export const Live = styled('span')(
  mq({
    display: ['none', 'none', 'inline'],
    marginLeft: '0.5em',
    fontFamily: 'inherit'
  })
);

export const Map = styled('span')(
  monoSpan,
  mq({ display: ['none', 'flex'], marginLeft: '4px' })
);

export const Status = styled('span')(
  monoSpanYellow,
  mq({
    marginLeft: '4px',
    display: ['none', 'none', 'flex']
  })
);
