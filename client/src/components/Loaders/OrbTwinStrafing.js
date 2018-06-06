import React, { Component } from 'react';
import Transition from 'react-transition-group/Transition';
import { Wrapper, OrbWrapper, Orb1, Orb2 } from './OrbTwinStrafing.style';
import { hexToRGB } from './helpers/color';

export default class OrbTwinStrafing extends Component {
  render() {
    const {
      backgroundColor = 'black',
      backgroundOpacity = 0.2,
      orbColors = ['aquamarine', 'slategray'],
      orbOpacity = 0.8,
      orbSize = 64,
      show = true,
      speed = 1000,
      enterExitDuration = 300,
      unmountOnExit = false
    } = this.props;
    return (
      <Transition
        appear={true}
        in={show}
        timeout={enterExitDuration}
        unmountOnExit={unmountOnExit}
      >
        {state => (
          <Wrapper
            animationState={state}
            backgroundColor={hexToRGB(backgroundColor)}
            backgroundOpacity={backgroundOpacity}
            enterExitDuration={enterExitDuration}
          >
            <OrbWrapper>
              <Orb1
                color={orbColors && orbColors[0]}
                opacity={orbOpacity}
                size={orbSize}
                speed={speed}
              />
              <Orb2
                color={orbColors && orbColors[1]}
                opacity={orbOpacity}
                size={orbSize}
                speed={speed}
              />
            </OrbWrapper>
          </Wrapper>
        )}
      </Transition>
    );
  }
}
