import React, {useRef} from 'react';
import CameraOptions from './camera/CameraOptions';
import ImageCamera from './camera/ImageCamera';
import CameraControls from './camera/CameraControls';
import '../../styles/common/animations.scss';
import '../../styles/presentation/CameraApp.scss';

const CameraApp = (props) => {

  const imageCamera = useRef();

  function cameraShutter() {
    imageCamera.current.takePhoto();
  }

  return (
    props.active ?
    <div className="CameraApp">
      <CameraOptions />
      <ImageCamera ref={imageCamera} />
      <CameraControls shutter={() => cameraShutter()} />
    </div> : ''
  );
}

export default CameraApp;
