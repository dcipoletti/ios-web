import React from 'react';
import CameraOptions from './camera/CameraOptions';
import CameraControls from './camera/CameraControls';
import '../../styles/common/animations.css';
import '../../styles/presentation/CameraApp.scss';

const CameraApp = (props) => {

  return (
    props.active ?
    <div className="CameraApp">
      <CameraOptions />
      <div className="cameraView"></div>
      <CameraControls />
    </div> : ''
  );
}

export default CameraApp;
