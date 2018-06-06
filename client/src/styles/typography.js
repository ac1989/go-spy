import { css } from 'emotion';
import { theme } from './theme';

export const monoSpan = css({
  display: 'flex',
  alignItems: 'center',
  background: theme.colour.primaryDark,
  padding: `0 ${theme.spacingUnit}px`,
  fontFamily: `'Share Tech Mono', monospace`
});

export const secondaryText = css({
  fontFamily: `'Share Tech Mono', monospace`,
  color: theme.colour.secondary
});

export const monoSpanYellow = css(monoSpan, secondaryText);
