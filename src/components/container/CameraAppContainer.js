import React, {useContext} from 'react';
import CameraApp from '../presentation/CameraApp';

import {Context} from '../../DataStore';

const CameraAppContainer = () => {
  
  const {store} = useContext(Context);

  return (
    <div className="CameraAppContainer">
      <CameraApp active={store.cameraActive} />
    </div>
  );
}

export default CameraAppContainer;
