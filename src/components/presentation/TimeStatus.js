import React from 'react';
import '../../styles/presentation/TimeStatus.scss';

const TimeStatus = (props) => {
  console.log('rendering TS');
  return (
    <div className="TimeStatus">
      {props.time}
    </div>
  );
}

export default TimeStatus;
