import React from 'react';
import TimeStatusContainer from './container/TimeStatusContainer';
import DateTime from './presentation/DateTime';
import DataFeedContainer from './container/DataFeedContainer';
import SwipeUnlock from './presentation/SwipeUnlock';
import '../styles/Phone.scss';

const iPhone = () => {
  console.log('IP');
  return (
    <div className="Phone">
      <div className="phoneWrapper">
        <div className="phoneScreen">

          {/* Phone Notch and Camera */}
          <div className="phoneNotch">
            <div className="notchSpeaker"></div>
            <div className="notchCamera">
              <div className="notchReflect left"></div>
              <div className="notchReflect right"></div>
              <div className="notchLens"></div>
            </div>
          </div>

          {/* Screen Components */}
          <TimeStatusContainer />
          <DateTime />
          <DataFeedContainer />
          <SwipeUnlock />
        </div>
      </div>
    </div>
  );
}

export default iPhone;
