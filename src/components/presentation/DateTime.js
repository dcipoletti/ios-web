import React, {useContext} from 'react';
import '../../styles/presentation/DateTime.scss';

import {Context} from '../../DataStore';

const DateTime = (props) => {
  console.log('rendering DT');
  const {store} = useContext(Context);
  
  return (
    <div className="DateTime">
      <div className="lockIcon">
        <div className="lockLock">
          <div className="lockHook"></div>
        </div>
      </div>
      <div className="timeData">
        {store.dateTime.time}
      </div>
      <div className="dateData">
        {`${store.dateTime.day}, ${store.dateTime.date}`}
      </div>
    </div>
  );
}

export default DateTime;
