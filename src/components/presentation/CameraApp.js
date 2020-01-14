import React from 'react';
import '../../styles/common/animations.css';
import '../../styles/presentation/CameraApp.scss';

const CameraApp = (props) => {

  return (
    props.active ?
    <div className="CameraApp">
      <div className="cameraFlash"></div>
      <div className="cameraView"></div>
      <div className="cameraControls"></div>
    </div> : ''
  );
}

export default CameraApp;
