import React, {useContext} from 'react';
import '../../styles/common/animations.scss';
import '../../styles/presentation/SwipeUnlock.scss';

import {Context} from '../../DataStore';

const SwipeUnlock = () => {

  const {store, dispatch} = useContext(Context);

  function homeAction(event) {
    if (store.cameraActive) {
      dispatch({
        type: 'resetCamera'
      });
    } else {
      // TO-DO: Password unlock screen <UnlockScreen />
    }
  }

  return (
    store.unlocking ? '' :
    <div className="SwipeUnlock">
      <button 
        className="swipeButton"
        onClick={(event) => homeAction(event)}>
        <div className={`swipeMessage${store.cameraActive ? "" : " messageReveal"}`}>
          Swipe up to unlock
        </div>
        <div className={`swipeIndicator${store.cameraActive ? "" : " pushMessage"}`}></div>
      </button>
    </div>
  );
}

export default SwipeUnlock;
