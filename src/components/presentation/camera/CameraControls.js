import React, {useContext, useState} from 'react';
import '../../../styles/presentation/camera/CameraControls.scss';

import {Context} from '../../../DataStore';

const CameraControls = (props) => {

  const {store, dispatch} = useContext(Context);
  
  const cameraTypes = ['video','photo'];
  
  function selectCamera(type) {
    dispatch({
      type: 'selectCamera',
      cameraType: type
    });
  }

  return (
    <div className="CameraControls">
      <div className="cameraType">
        <div className={`typeContainer ${store.cameraType}`}>
          {cameraTypes.map((type,i) => {
            return (
              <button 
                className={`type${store.cameraType === type ? " selected" : ""}`} 
                key={`type${i}`}
                onClick={() => selectCamera(type)}>
                {type}
              </button>
            )
          })
          }
        </div>
      </div>
      <div className="cameraButtons">
        <div className="photoLibrary"></div>
        <button className="shutterButton">
          <div className="shutter"></div>
        </button>
        <button className="cameraFlip">
          <div className="cameraBody">
            <div className="cameraTop"></div>
            <div className="cameraShutter"></div>
            <div className="flipIcon">
              <div className="flipCircle"></div>
              <div className="flipBlock"></div>
              <div className="flipTriangle left"></div>
              <div className="flipTriangle right"></div>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}

export default CameraControls;
