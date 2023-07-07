import React, {useContext, useRef, useEffect} from 'react';
import TimeStatus from '../presentation/TimeStatus';
import NetworkStatus from '../presentation/NetworkStatus';

import {Context} from '../../DataStore';

const TimeStatusContainer = () => {

  const {store, dispatch} = useContext(Context);
  const setTime = useRef(false);

  // Render Current Time
  function determineTime() {
    let time = new Date();
    return time.toLocaleString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).slice(0, -3).replace(/,/g, '').split(' ');
  }

  function renderTime() {
    let dateData = determineTime();
    console.log(dateData)
    dispatch({
      type: 'setDateTime',
      dateTime: {
        day: dateData[0],
        date: `${dateData[1]} ${dateData[2]}`,
        time: dateData[4]
      }
    });
  }

  useEffect(() => {
    if (!setTime.current) {
      setTime.current = true;
      renderTime();
      setInterval(() => {
        renderTime();
      }, 60000);
    }
  });

  return (
    <div className="TimeStatusContainer">
      <TimeStatus time={store.dateTime.time} />
      <NetworkStatus />
    </div>
  );
}

export default TimeStatusContainer;
