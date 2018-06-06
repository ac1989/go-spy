import React from 'react';
import { monoSpan, secondaryText } from '../../styles/typography';

const MatchStatus = props => {
  return (
    <div className={monoSpan}>
      STATUS: <span className={secondaryText}>'{props.status}'</span>
    </div>
  );
};

export default MatchStatus;
