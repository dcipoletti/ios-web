import React, {useState, useContext, useEffect, useRef, forwardRef, useImperativeHandle} from 'react';
import '../../../styles/presentation/camera/ImageCamera.scss';

import {Context} from '../../../DataStore';

const ImageCamera = forwardRef((props, ref) => {

  const {store, dispatch} = useContext(Context);

	// Photo Functions
	const [cameraStarted, setCameraStarted] = useState(false);
	const [cameraStream, setCameraStream] = useState(window.MediaRecorder === undefined ? '' : new window.MediaRecorder(new MediaStream()));
  const [zoomLevel, setZoomLevel] = useState(1);
  const [countDown, setCountDown] = useState(0);
  const [countingDown, setCountingDown] = useState(false);
  const [cameraShutter, setCameraShutter] = useState(false);

  // Photo Options
  const [flashOn, setFlashOn] = useState(false);

  const cameraActive = useRef(false);
  const countTimer = useRef(null);
  const count = useRef(0);

  // WebRTC Enabled
  const webRTCEnabled = (window.MediaRecorder !== undefined && window.MediaSource !== undefined);
  const effects = ['none','bw','sepia','hc'];

	function startCamera() {
    cameraActive.current = true;
    const cameraVideo = document.querySelector('.cameraVideo');

		if (cameraVideo !== null && webRTCEnabled) {
			navigator.mediaDevices.getUserMedia({
				audio: {
					echoCancellation: false
				},
				video: {
					width: 510,
					height: 900
				}
			})
			.then((stream) => {
        setCameraStream(stream);

        cameraVideo.srcObject = stream;
        cameraVideo.play();
        
        return new Promise(resolve => cameraVideo.onplaying = resolve);
			})
			.then(() => {
				setCameraStarted(true);
			})
			.catch((err) => {
				console.log("STATUS: Camera error occurred: " + err);
			});
		}
  }
  
  /*function renderEffects() {
    navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: false
      },
      video: {
        width: 200,
        height: 200
      }
    })
    .then((stream2) => {
      const effectVideo0 = document.querySelector('.effectVideo0');
      const effectVideo1 = document.querySelector('.effectVideo1');
      const effectVideo2 = document.querySelector('.effectVideo2');
      const effectVideo3 = document.querySelector('.effectVideo3');
      
      effectVideo0.srcObject = stream2;
      effectVideo0.play()
      .then(function() {
        effectVideo1.srcObject = stream2;
        effectVideo1.play();
      })
      .then(function() {
        effectVideo2.srcObject = stream2;
        effectVideo2.play()
      })
      .then(function() {
        effectVideo3.srcObject = stream2;
        effectVideo3.play()
      });
    });
  }*/

  useImperativeHandle(ref, () => ({
    stopCamera() {
      const cameraVideo = document.querySelector('.cameraVideo');
      if (cameraVideo !== null) {
        cameraStream.getTracks()[0].stop();
        cameraStream.getTracks()[1].stop();
        cameraVideo.pause();
        cameraVideo.srcObject = null;
      
        setCameraStarted(false);
      }
    }
  }));

  useImperativeHandle(ref, () => ({
    takePhoto() {
      const cameraVideo = document.querySelector('.cameraVideo');
      const cameraPhoto = document.querySelector('.cameraPhoto');
      const cameraCanvas = document.querySelector('.cameraCanvas');

      function photoAction() {
        if (cameraVideo !== null && cameraPhoto !== null && cameraCanvas !== null && cameraStarted) {
          setCameraShutter(true);
          setTimeout(() => {
            setCameraShutter(false);
          },150);
          let context = cameraCanvas.getContext('2d');					
            cameraCanvas.width = 200;
            cameraCanvas.height = 200;
            context.save();	
            context.scale(-1,1);
            if (zoomLevel === 1) {
              context.drawImage(cameraVideo, -200, 0, 200, 200);
            } else {
              context.drawImage(cameraVideo, 175, 300, 200, 200, -200, 0, 200, 200);
            }

          let data = cameraCanvas.toDataURL('image/png');
          cameraPhoto.setAttribute('src', data);
          
          dispatch({
            type: 'takingPhoto',
            takingPhoto: false
          });
          setFlashOn(false);
        }
      }

      function snapPhoto() {
        if (store.camera.flash !== 'Off') {
          setFlashOn(true);
          setTimeout(() => {
            photoAction();
          },150);
        } else {
          photoAction();
        }
      }

      dispatch({
        type: 'takingPhoto',
        takingPhoto: true
      });
      if (store.camera.timer !== 'Off') {
        count.current = Number(store.camera.timer);
        setCountDown(count.current);
        setCountingDown(true);
        countTimer.current = setInterval(() => {
          if (count.current > 1) {
            count.current = count.current - 1;
            setCountDown(count.current);
          } else {
            clearInterval(countTimer.current);
            setCountingDown(false);
            snapPhoto();
          }
        }, 1000);
      } else {
        snapPhoto();
      }
    }
  }));
  
  useEffect(() => {
    if (!cameraActive.current) {
      startCamera();
    }
    if (!store.takingPhoto) {
      const videoEffects = document.querySelectorAll('.effectVideo');
      videoEffects.forEach((videoPlayer) => {
        videoPlayer.srcObject = (store.effects.active ? cameraStream : null);
        if (store.effects.active) {
          videoPlayer.play();
        } else {
          videoPlayer.pause();
        }
      });
    }
  });

	return (
		<div className={`ImageCamera${store.effects.active ? " active" : ""}`}>

      {/* Camera Preview Video */}
      <div className="cameraCamera">
        <div className={`cameraItemWrapper${store.effects.active ? " active" : ""}`}>
					<video 
            className={`cameraVideo
              ${zoomLevel === 1 ? "" : " zoomed"}
              ${cameraShutter ? " snapping" : ""}`}
						playsInline 
						muted />
          {countingDown ? 
          <div className="countDown">
						{countDown}
          </div> : ''
          }
          <button 
            className="cameraZoom"
            onClick={() => setZoomLevel(zoomLevel === 1 ? 2 : 1)}>
            <div className="zoomLevel">
              {zoomLevel} x
            </div>
          </button>
          <div className={`cameraFlash${flashOn ? " flash" : ""}`}></div>
				</div>
      </div>

      {/* Hidden Render Canvas */}
      <canvas className="cameraCanvas"></canvas>

      {/* Camera Effects Preview */}
      <div className={`effectsContainer${store.effects.active ? " active" : ""}`}>
        {effects.map((effect,i) => {
          return (
          <button
            className="cameraEffect"
            key={`effect${i}`}>
              <div className={`effectWrapper${effect === store.effects.effect ? " selected" : ""}`}>
                <video 
                className={`effectVideo effectVideo${i}`}
                playsInline 
                muted />
              </div>
          </button>
          )
        })}
      </div>
		</div>
	);
});

export default ImageCamera;