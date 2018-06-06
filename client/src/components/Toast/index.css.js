import styled from 'react-emotion';

export const Container = styled('div')(props => ({
  display: props.show ? 'block' : 'none',
  position: 'fixed',
  background: props.theme.colour.primaryDark,
  padding: `${props.theme.spacingUnit}px ${props.theme.spacingUnit * 2}px`,
  bottom: 0 + props.theme.spacingUnit * 2,
  boxShadow: '0 2px 6px rgba(0,0,0,0.5);',
  fontFamily: `'Share Tech Mono', monospace`
}));
