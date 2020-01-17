import React, {useContext} from 'react';
import '../../styles/presentation/UnlockScreen.scss';

import {Context} from '../../DataStore';

const UnlockScreen = () => {

  const {store, dispatch} = useContext(Context);
  const numberGroups = ["","ABC","DEF","GHI","JKL","MNO","PQRS","TUV","WXYZ",""]

  function pressNumber(event) {
  }

  return (
    store.unlocking ?
    <div className="UnlockScreen">
      <div className="unlockBlur">
        <div className="blurMask"></div>
      </div>
      <div className="numberWrapper">
        <div className="numberGroup">
          {numberGroups.map((letters,i) => {
            return (
              <button 
                id={i}
                className={`number${i === 9 ? " zero" : ""}`} 
                key={i}
                onClick={(event) => pressNumber(event)}>
                <div className="textWrapper">
                  <div className={`numberNumber${i === 9 ? " zero" : ""}`}>
                    {i < 9 ? (i + 1) : 0}
                  </div>
                  <div className="numberLetters">
                    {letters}
                  </div>
                </div>
              </button>
            )
          })
          }
        </div>
      </div>
    </div> : ''
  );
}

export default UnlockScreen;
