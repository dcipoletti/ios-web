import React from 'react';
import '../../styles/presentation/NetworkStatus.scss';

const NetworkStatus = () => {
  console.log('rendering NS');
  return (
    <div className="NetworkStatus">
      <div className="batteryIcon">
        <div className="batteryTerminal">
          <div className="batteryPercentage"></div>
        </div>
        <div className="batteryContact">
          <div className="contactPoint"></div>
        </div>
      </div>
      <div className="connectionType">
        LTE
      </div>
      <div className="networkConnection">
        <div className="barWrapper">
          <div className="connectionBar small"></div>
        </div>
        <div className="barWrapper">
          <div className="connectionBar medium"></div>
        </div>
        <div className="barWrapper">
          <div className="connectionBar large"></div>
        </div>
        <div className="barWrapper noConnection">
          <div className="connectionBar xlarge"></div>
        </div>
      </div>
    </div>
  );
}

export default NetworkStatus;
