import React, {useState,useContext} from 'react';
import '../../../styles/common/animations.scss';
import '../../../styles/presentation/camera/CameraOptions.scss';

import {Context} from '../../../DataStore';

const CameraOptions = () => {
  
  const {store, dispatch} = useContext(Context);

  // Option State Management
  const [live, setLive] = useState(false);

  // Visible State Management
  const [wasLive, setWasLive] = useState(false);
  const [settingFlash, setSettingFlash] = useState(false);
  const [settingTimer, setSettingTimer] = useState(false);

  const [timerTime, setTimerTime] = useState(false);
  const [showing, setShowing] = useState(false);
  const [visible, setVisible] = useState(false);

  // Menu selection for Flash and Timer
  function selectChoice(option) {
    if (settingFlash) {
      dispatch({
        type: 'cameraOptions',
        camera: {
          ...store.camera,
          flash: option
        }
      });
      setSettingFlash(false);
    } else {
      dispatch({
        type: 'cameraOptions',
        camera: {
          ...store.camera,
          timer: option.replace('s','')
        }
      });
      setSettingTimer(false);
      if (option !== 'Off') {
        setTimerTime(false);
        setTimeout(() => {
          setTimerTime(true);
        }, 250);
      }
    }
  }

  // Animation manager for Live
  function selectLive() {
    setTimeout(() => {
      setWasLive(!live);
    }, (live ? 0 : 1700));
    setLive(!live);

    // Visibile WIP
    if (!showing) {
      setVisible(true);
      setTimeout(() => {
        setVisible(false);
      }, 3000);
      setTimeout(() => {
        setShowing(true);
        setTimeout(() => {
          setShowing(false);
        }, 2600);
      }, 350);
    }
  }

  function selectEffect() {
    dispatch({
      type: 'toggleEffects',
      effects: {
        active: !store.effects.active,
        effect: store.effects.effect
      },
    });
  }

  // Menu array selections
  const options = settingFlash ? ['Auto', 'On', 'Off'] : ['Off', '3s', '10s'];

  return (
    <div className={`CameraOptions${store.effects.active ? " effectsActive" : ""}`}>

      {/* Camera Flash */}
      <button 
        className={`optionButton flash
        ${settingTimer ? " hidden" : ""}
        ${(store.camera.flash !== 'Off' && !settingFlash) ? " on" : ""}`}
        onClick={() => setSettingFlash(settingFlash ? !settingFlash : true)}>
        <div className="flashIcon">
          <div className="flashUp"></div>
          <div className="flashDown"></div>
          <div className={`flashOff${store.camera.flash !== "Off" || settingFlash ? " off" : ""}`}></div>
        </div>
      </button>

      {/* Camera Live */}
      <button 
        className={`optionButton live
        ${settingFlash || settingTimer ? " hidden" : ""}
        ${live ? " on" : ""}
        ${wasLive ? " wasLive" : ""}`}
        onClick={() => selectLive()}>
        <div className="liveIcon">
          <div className="liveDotted"></div>
          <div className="liveThin"></div>
          <div className="liveThick"></div>
          <div className="movingThin"></div>
          <div className={`liveOff${live ? " off" : ""}`}></div>
        </div>
      </button>

      {/* Camera Timer */}
      <button 
        className={`optionButton timer
        ${settingFlash ? " hidden" : ""}
        ${settingTimer ? " active" : ""}
        ${(store.camera.timer !== 'Off' && !settingTimer) ? " on" : ""}`}
        onClick={() => setSettingTimer(!settingTimer)}>
        <div className="timerIcon">
          <div className="timerClock"></div>
          <div className="timerTick"></div>
          <div className="timerUntil"></div>
          <div className="timerArm">
            <div className="timerHand"></div>
            <div className="timerHead"></div>
          </div>
        </div>
        <div className={`timerTime
          ${settingTimer || store.camera.timer === 'Off' ? " hidden" : ""}
          ${timerTime ? " active" : ""}`}>
          {`${store.camera.timer}s`}
        </div>
      </button>

      {/* Camera Effects */}
      <button 
        className={`optionButton effect${settingFlash || settingTimer ? " hidden" : ""}`}
        onClick={() => selectEffect()}>
        <div className={`effectIcon${store.effects.effect === 'none' ? "" : " effect"}`}>
          <div className="effectCircle light"></div>
          <div className="effectCircle medium"></div>
          <div className="effectCircle dark"></div>
        </div>
      </button>

      {/* Dynamic Labels */}
      {store.effects.active ? '' :
      <div className="labelWrapper">
        <div className="labelStack">
          {(store.camera.flash !== 'Off' && !settingTimer) ? 
          <div className="label">
            <div className="flashIndicator">
              <div className="flashIcon">
                <div className="flashUp"></div>
                <div className="flashDown"></div>
              </div>
            </div>
          </div> : ''
          }
          {visible ? 
          <div className="label">
            <div className={`liveIndicator
            ${visible ? " visible" : ""}
            ${live ? " on" : ""}
            ${showing ? " showing" : ""}`}>
              <div className="liveText">
                {`LIVE${live ? "" : " OFF"}`} 
              </div>
            </div>
          </div> : ''
          }
        </div>
      </div>
      }

      {/* Dynamic Option Selections */}
      {(settingFlash || settingTimer) ? 
      <div className="optionWrapper">
        {options.map((option, i) => {
            return (
              <button 
                className={`optionSelection${option === String(settingFlash ? store.camera.flash : store.camera.timer) ? " selected" : ""}`} 
                key={`option${i}`}
                onClick={() => selectChoice(option)}>
                {option}
              </button>
            )
          })
        }
      </div> : ''
      }
    </div>
  );
}

export default CameraOptions;
