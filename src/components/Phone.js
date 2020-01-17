import React, {useContext} from 'react';
import TimeStatusContainer from './container/TimeStatusContainer';
import DateTime from './presentation/DateTime';
import DataFeedContainer from './container/DataFeedContainer';
import LockTools from './presentation/LockTools';
import SwipeUnlock from './presentation/SwipeUnlock';
import CameraAppContainer from './container/CameraAppContainer';
//import UnlockScreen from './presentation/UnlockScreen';
import '../styles/Phone.scss';

import {Context} from '../DataStore';

const Phone = () => {

  const {store} = useContext(Context);

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

          {/* Camera App */}
          <CameraAppContainer />

          {/* Screen Components */}
          <div className={`onScreen${store.cameraActive ? " cameraActive" : ""}`}> 
            <DataFeedContainer />
            <LockTools />
            {/*<UnlockScreen />*/}
            <TimeStatusContainer />
            <DateTime />
          </div>
          <SwipeUnlock />
        </div>
      </div>
    </div>
  );
}

export default Phone;
