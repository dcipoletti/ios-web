import React from 'react';
import '../../styles/presentation/TimeStatus.scss';

const TimeStatus = (props) => {

  return (
    <div className="TimeStatus">
      {props.time}
    </div>
  );
}

export default TimeStatus;
