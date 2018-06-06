import facepaint from 'facepaint';

export const breakpoints = [600, 920, 1280, 1920];

export const mq = facepaint(
  breakpoints.map(bp => `@media (min-width: ${bp}px)`)
);
