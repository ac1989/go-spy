import styled from 'react-emotion';
import { mq } from '../../styles/breakpoints';

export const Container = styled('div')(props =>
  mq({
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  })
);

export const Row = styled('div')(
  mq({
    display: 'flex',
    width: '100%',
    flexDirection: ['column', 'column', 'row'],
    justifyContent: 'space-between'
  })
);

export const StatusBar = styled('div')(props => {
  const { theme } = props;
  return mq({
    width: ['100%', '100%', '100%', '832px', '1280px'],
    height: '40px',
    display: 'flex',
    marginTop: `${theme.spacingUnit}px`,
    justifyContent: 'space-between'
  });
});
