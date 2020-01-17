import React, {useContext, useState, useEffect} from 'react';
import '../../../styles/common/animations.scss';
import '../../../styles/presentation/camera/CameraControls.scss';

import {Context} from '../../../DataStore';

const CameraControls = (props) => {

  const {store, dispatch} = useContext(Context);
  const [takingPhoto, setTakingPhoto] = useState(false);
  
  const cameraTypes = ['video','photo'];
  
  function selectCamera(type) {
    dispatch({
      type: 'selectCamera',
      cameraType: type
    });
  }

  function shutter() {
    if (!store.takingPhoto) {
      props.shutter();
      setTakingPhoto(true);
      setTimeout(() => {
        setTakingPhoto(false);
      },500);
    }
  }

  useEffect(() => {
    const cameraPhoto = document.querySelector('.cameraPhoto');
    const photoPresent = (cameraPhoto !== null && cameraPhoto.hasAttribute('src'));
    cameraPhoto.style.visibility = (photoPresent ? 'visible' : 'hidden');
  });

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
        <div className="photoLibrary">
          <div className="cameraOutput">
            <img 
							className="cameraPhoto" 
              alt="Screen capture preview" /> 
					</div>
        </div>
        <button 
          className="shutterButton"
          onClick={() => shutter()}>
          <div className={`shutter${takingPhoto ? " active" : ""}`}></div>
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
