import React, {useContext, useState, useEffect} from 'react';
import '../../styles/common/animations.scss';
import '../../styles/presentation/UnlockScreen.scss';

import {Context} from '../../DataStore';

const UnlockScreen = () => {

  const {store, dispatch} = useContext(Context);

  const [enterPasscode, setEnterPasscode] = useState([]);
  const [closing, setClosing] = useState(false);
  const [opening, setOpening] = useState(false);
  const numberGroups = ["","ABC","DEF","GHI","JKL","MNO","PQRS","TUV","WXYZ",""]

  function pressNumber(event) {
    const element = event.currentTarget;
    const pressed = element.id;

    let newPasscode = [...enterPasscode];
    newPasscode.push(pressed);
    setEnterPasscode(newPasscode);
    
    if (newPasscode.length > 3) {
      dispatch({
        type: 'toggleWrongPasscode',
        wrongPasscode: true
      });
      setTimeout(() => {
        setEnterPasscode([]);
        dispatch({
          type: 'toggleWrongPasscode',
          wrongPasscode: false
        });
      },400);
    }
  }

  function cancelAction() {
    setClosing(true);
    setTimeout(() => {
      setEnterPasscode([]);
      setClosing(false);
      dispatch({
        type: 'toggleUnlocking',
        unlocking: false
      });
      setOpening(false);
    },500);
  }

  useEffect(() => {
    if (!opening && store.unlocking) {
      setOpening(true);
    }
  }, [opening, setOpening, store.unlocking]);

  return (
    store.unlocking ?
    <div className="UnlockScreen">
      <div className={`unlockBlur${closing ? " closing" : ""}`}>
        <div className="blurMask"></div>
      </div>
      <div className={`unlockVisible${closing ? " closing" : ""}`}>
        <div className="enterPasscode">
          Enter Passcode
        </div>
        <div className={`dotWrapper${store.wrongPasscode ? " wrong" : ""}`}>
          <div className="unlockDots">
            <div className="dotContainer">
              <div className="dot"></div>
            </div>
            <div className="dotContainer">
              <div className="dot"></div>
            </div>
            <div className="dotContainer">
              <div className="dot"></div>
            </div>
            <div className="dotContainer">
              <div className="dot"></div>
            </div>
          </div>
          <div className="enteredDots">
            {enterPasscode.map((_,i) => {
              return (
                <div className="dotContainer" key={i}>
                  <div className="dot"></div>
                </div>
              )
            })
            }
          </div>
        </div>

        <div className="numberWrapper">
          <div className={`numberGroup${closing ? " closing" : ""}${opening ? " opening" : ""}`}>
            {numberGroups.map((letters,i) => {
              return (
                <button 
                  id={i === 9 ? 0 : i + 1}
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
        <div className="optionButtons">
          <button className="buttonChoice emergencyButton">
            Emergency
          </button>
          <button 
            className="buttonChoice cancelButton"
            onClick={() => cancelAction()}>
            Cancel
          </button>
        </div>
      </div>
    </div> : ''
  );
}

export default UnlockScreen;
