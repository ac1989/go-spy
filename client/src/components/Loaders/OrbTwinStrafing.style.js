import styled, { css, keyframes } from 'react-emotion';

const backAndForth = keyframes({
  '0%': {
    transform: 'translateX(-33%)'
  },
  '50%': {
    transform: 'translateX(33%)'
  },
  '100%': {
    transform: 'translateX(-33%)'
  }
});

const wrapperTransitionStyles = {
  entering: { opacity: 0 },
  entered: { opacity: 1 }
};

const orb = css({
  borderRadius: '50%',
  opacity: '0.8',
  width: '64px',
  height: '64px',
  animation: `${backAndForth} 1s infinite`
});

export const Wrapper = styled('div')(props => ({
  zIndex: 200,
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  transition: `opacity ${props.enterExitDuration}ms ease-in-out`,
  background: `rgba(${props.backgroundColor + props.backgroundOpacity})`,
  opacity: 0,
  ...wrapperTransitionStyles[props.animationState]
}));

export const OrbWrapper = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
});

export const Orb1 = styled('div')(orb, props => ({
  width: props.size,
  height: props.size,
  background: props.color,
  opacity: props.opacity,
  animationDuration: `${props.speed}ms`
}));

export const Orb2 = styled('div')(orb, props => ({
  width: props.size,
  height: props.size,
  position: 'absolute',
  background: props.color,
  opacity: props.opacity,
  animationDuration: `${props.speed}ms`,
  animationDelay: `-${props.speed / 2}ms`
}));
