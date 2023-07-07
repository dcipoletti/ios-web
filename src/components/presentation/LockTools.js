import React, {useContext} from 'react';
import '../../styles/common/animations.scss';
import '../../styles/presentation/LockTools.scss';

import {Context} from '../../DataStore';

const LockTools = () => {
 
  const {store, dispatch} = useContext(Context);
  
  function toggleFlashlight() {
    dispatch({
      type: 'toggleFlashlight',
      flashlightActive: !store.flashlightActive
    });
  }

  function toggleCamera() {
    dispatch({
      type: 'toggleCamera',
      cameraActive: !store.cameraActive
    });
  }

  return (
    store.unlocking ? '' :
    <div className="LockTools">
      <button 
        className="toolButton flashlight"
        onClick={() => toggleFlashlight()}>
        <div className="buttonBackground"></div>
        <div className="toolIcon flashlight">
          <div className="flashlightHandle">
            <div className="flashlightSwitch">
              <div className="flashlightButton"></div>
            </div>
          </div>
          <div className="flashlightHead">
            <div className="headCircle"></div>
          </div>
         <div className="flashlightTip"></div>
        </div>
      </button>
      <button 
        className="toolButton camera"
        onClick={() => toggleCamera()}>
        <div className="buttonBackground"></div>
        <div className="toolIcon camera">
          <div className="cameraBody">
            <div className="bodyRing"></div>
            <div className="bodyFinder"></div>
          </div>
          <div className="cameraTop"></div>
          <div className="cameraShutter"></div>
        </div>
      </button>
    </div>
  );
}

export default LockTools;
