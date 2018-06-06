import React from 'react';
import { Wrapper, NavButton } from './index.styles';

const Header = props => {
  const { pathname } = props.location;
  return (
    <Wrapper>
      <NavButton to="/" isCurrentPath={pathname === '/'}>
        HOME
      </NavButton>
      <NavButton to="/clips" isCurrentPath={pathname === '/clips'}>
        CLIPS
      </NavButton>
    </Wrapper>
  );
};

export default Header;
