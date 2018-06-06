import styled from 'react-emotion';
import { mq } from '../../styles/breakpoints';
import avatars from '../../images/avatars';
import default_bg from '../../images/player_card_bg.jpg';

const borderBottom = props => {
  if (props.isCurrentStreamer) {
    return props.theme.colour.secondaryDark;
  }
  if (props.isStreaming) {
    return props.theme.colour.secondaryDark;
  }
  return props.theme.colour.primaryDark;
};

const background = props => {
  if (props.isCurrentStreamer) {
    return `url(${props.streamImg})`;
  }
  if (props.isStreaming) {
    return `url(${default_bg})`;
  }
  return `url(${default_bg})`;
};

export const Container = styled('div')(props => {
  const { theme } = props;
  return mq({
    position: 'relative',
    display: 'flex',
    flexDirection: ['column', 'column', 'column-reverse', 'row', 'row'],
    justifyItems: 'space-around',
    width: ['19%', '18%', '64px', '216px', '242px'],
    height: ['72px', '72px', '72px', '88px', '136px'],
    background: background(props),
    backgroundPosition: 'center right',
    borderBottom: `${theme.spacingUnit}px solid ${borderBottom(props)}`
  });
});

const determineAvatar = avatar => {
  if (!avatar || avatar.includes('default-profile')) {
    return `url(${avatars.default_avatar})`;
  }
  return `url(${avatar})`;
};

export const Avatar = styled('div')(props => {
  const { theme, avatar } = props;
  return mq({
    width: ['48px', '48px', '48px', '48px', '64px'],
    height: ['48px', '48px', '48px', '48px', '64px'],
    margin: [
      `${theme.spacingUnit}px`,
      `${theme.spacingUnit}px`,
      `${theme.spacingUnit}px`,
      `${theme.spacingUnit}px`,
      `${theme.spacingUnit * 2}px`
    ],
    background: determineAvatar(avatar),
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    boxShadow: '0 2px 10px rgba(0,0,0,0.3);'
  });
});

export const Details = styled('div')(
  mq({
    display: 'flex',
    flexDirection: 'column'
  })
);

export const PlayerName = styled('span')(props => {
  const { theme } = props;

  return mq({
    display: ['none', 'none', 'none', 'inline'],
    height: '2em',
    marginTop: [
      0,
      0,
      0,
      `${theme.spacingUnit}px`,
      `${theme.spacingUnit * 2}px`
    ],
    padding: [0, `${theme.spacingUnit}px`],
    background: 'rgba(0, 0, 0, 0.7)'
  });
});

export const LiveIndicator = styled('span')(props => {
  const { theme } = props;
  return mq({
    display: ['none', 'none', 'none', 'inline-block'],
    padding: `4px ${theme.spacingUnit}px`,
    marginTop: theme.spacingUnit,
    marginRight: 'auto',
    background: 'rgba(0, 0, 0, 0.7)',
    color: 'red'
  });
});
