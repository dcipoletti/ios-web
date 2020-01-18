import React, {useContext, useState} from 'react';
import '../../styles/common/animations.scss';
import '../../styles/presentation/SwipeUnlock.scss';

import {Context} from '../../DataStore';

const SwipeUnlock = (props) => {

  const {store, dispatch} = useContext(Context);

  const [openUnlock, setOpenUnlock] = useState(false)

  function notifyUnlock(value) {
    setOpenUnlock(value);
    props.openUnlock(value);
  }

  function homeAction() {
    if (store.cameraActive) {
      dispatch({
        type: 'resetCamera'
      });
    } else {
      notifyUnlock(true);
      setTimeout(() => {
        notifyUnlock(false);
        dispatch({
          type: 'toggleUnlocking',
          unlocking: true
        });
      },500)
    }
  }

  return (
    store.unlocking ? '' :
    <div className={`SwipeUnlock${openUnlock ? " opening" : ""}`}>
      <button 
        className="swipeButton"
        onClick={() => homeAction()}>
        <div className={`swipeMessage${store.cameraActive || openUnlock ? "" : " messageReveal"}`}>
          Swipe up to unlock
        </div>
        <div className={`swipeIndicator${store.cameraActive || openUnlock ? "" : " pushMessage"}`}></div>
      </button>
    </div>
  );
}

export default SwipeUnlock;
