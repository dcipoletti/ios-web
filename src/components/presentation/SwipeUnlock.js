import React from 'react';
import '../../styles/common/animations.css';
import '../../styles/presentation/SwipeUnlock.scss';

const SwipeUnlock = () => {

  return (
    <div className="SwipeUnlock">
      <div className="swipeMessage messageReveal">
        Swipe up to unlock
      </div>
      <div className="swipeIndicator pushMessage"></div>
    </div>
  );
}

export default SwipeUnlock;
