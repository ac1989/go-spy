import React from 'react';
import Transition from 'react-transition-group/Transition';

const defaultStyles = {
  transform: 'translateY(16px)',
  transition: 'all 0.2s ease-out',
  opacity: 0
};

const transitionStyles = {
  entering: {
    transform: 'translatex(100px)',
    opacity: 0
  },
  entered: {
    transform: 'translateY(0px)',
    opacity: 1
  }
};

const FadeUp = props => (
  <Transition appear={true} in={true} timeout={200}>
    {state => (
      <div style={{ ...defaultStyles, ...transitionStyles[state] }}>
        {props.children}
      </div>
    )}
  </Transition>
);

export default FadeUp;
