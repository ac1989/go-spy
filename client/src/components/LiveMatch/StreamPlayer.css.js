import styled, { css } from 'react-emotion';
import { mq } from '../../styles/breakpoints';

const dimensions = css(
  mq({
    width: ['100%', '600px', '776px', '832px', '1280px'],
    height: ['300px', '337px', '436px', '468px', '720px']
  })
);

export const Stream = styled('iframe')(
  {
    minWidth: 0
  },
  dimensions
);

export const NoStream = styled('div')(
  mq({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'rgba(0, 0, 0, 0.5)'
  }),
  dimensions
);
