import React from 'react';
import { monoSpan } from '../../styles/typography';

const MatchStartedAt = props => {
  const formattedTime = () => {
    const time = props.startedAt
      ? new Date(props.startedAt * 1000)
      : new Date(props.configuredAt * 1000);
    return time.toLocaleTimeString();
  };
  return (
    <div className={monoSpan}>
      {props.startedAt ? 'Started At: ' : 'Configured At: '}
      {formattedTime()}
    </div>
  );
};

export default MatchStartedAt;
