import styled from 'react-emotion';
import { mq } from '../../styles/breakpoints';

export const Container = styled('div')(
  mq({
    marginTop: ['4px', '4px', 0],
    height: ['76px', '76px', '436px', '468px', '720px'],
    display: 'flex',
    flexDirection: ['row', 'row', 'column'],
    justifyContent: ['space-between']
  })
);
