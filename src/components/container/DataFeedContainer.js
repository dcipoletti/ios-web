import React, {useContext, useEffect} from 'react';
import DataFeed from '../presentation/DataFeed';

import {Context} from '../../DataStore';

const DataFeedContainer = () => {

  const {store, dispatch} = useContext(Context);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
          method: 'GET',
        }
        const url = 'https://sodasync.com/prototype/notifications.php';
        const response = await fetch(url, config);
        const notificationData = await response.json();

        dispatch({
          type: 'fetchNotifications',
          notifications: {
            fetched: true,
            data: response.ok ? notificationData : {}
          }
        });
      } catch (error) {
        dispatch({
          type: 'fetchNotifications',
          notifications: {
            fetched: true,
            data: {}
          }
        });
      }
    };
    if (!store.notifications.fetched) {
      fetchData();
    }
  }, [store.notifications, dispatch])
  
  return (
    <div className="DataFeedContainer">
      <DataFeed />
    </div>
  );
}

export default DataFeedContainer;
