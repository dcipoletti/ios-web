import React, {useContext, useEffect, useRef} from 'react';
import rubberBandEffect from 'rubber-band-effect';
import '../../styles/presentation/DataFeed.scss';

import {Context} from '../../DataStore';

const DataFeed = () => {

  const {store} = useContext(Context);

  const scrolling = useRef(false);
  const scrollCallback = useRef(null);
  const scrollAnimating = useRef(false);

  useEffect(() => {
    const dataFeed = document.querySelector('.DataFeed');
    const scrollWrapper = document.querySelector('.scrollWrapper');
    
    if (dataFeed !== null && scrollWrapper !== null) {
      rubberBandEffect(scrollWrapper);

      scrollWrapper.addEventListener('wheel', (event) => {
        if (!scrollAnimating.current) {
          scrolling.current = true;
          let paddingTop = parseFloat(window.getComputedStyle(dataFeed, null).getPropertyValue('padding-top'))
        
          function scrollDirection(event) {
            if (event.wheelDelta) {
              return event.wheelDelta > 0;
            }
            return event.deltaY < 0;
          }
          const moveUp = (scrollDirection(event) && paddingTop < 385);
          const moveDown = (!scrollDirection(event) && paddingTop > 0);

          dataFeed.style.paddingTop = (moveUp || moveDown ? String((paddingTop + (moveUp ? 1 : -1))+'px') : dataFeed.style.paddingTop);
          
          // Scroll stopped detection
          clearTimeout(scrollCallback.current);
          scrollCallback.current = setTimeout(() => {
            console.log("CALLING TIMEOUT")
            scrolling.current = false;
            scrollAnimating.current = true;

            // Web Animation API
            function dynamicAnimate(from,to) {
              console.log(from,to);
              var player = dataFeed.animate([
                {paddingTop: from},
                {paddingTop: to}
              ], 50);
              player.addEventListener('finish', function() {
                dataFeed.style.paddingTop = to;
                scrollAnimating.current = false;
              });
            }
            
            // Snap into place based on scroll location
            const animateTop = (paddingTop > 0 && paddingTop < 195);
            dynamicAnimate(dataFeed.style.paddingTop, (animateTop ? '0px' : '385px') ?? '0px');
          },100);
        }
      });
      
      scrollWrapper.addEventListener('scroll', (event) => {
        if (dataFeed.style.paddingTop === '0px') {
          
        } else {
          event.target.scrollTop = 0.0;
        }
      });
    }
  });

  return (
    <div className={`DataFeed${store.feedMode ? " feed" : ""}`}>
      <div className="scrollWrapper">
        <div className="scrollFeed">
          {store.notifications.data.length ? 
          store.notifications.data.map((notification, i) => {
            return (
              <div 
                className="notificationWrapper"
                key={`notification${i}`}>
                <div className="notificationData">
                  <div className="notificationIdentity">
                    <img 
                      src={`https://sodasync.com/prototype/svg/${notification.app.replace(' ','').toLowerCase()}.svg`}
                      alt={`${notification.app} Logo`}
                      className="notificationIcon" />
                    <div className="notificationApp">
                      {notification.app}
                    </div>
                    <div className="notificationDate">
                      {notification.date}
                    </div>
                  </div>
                  <div className="notificationInfo">
                    <div className="notificationTitle">
                      {notification.title}
                    </div>
                    <div className="notificationBody">
                      {notification.body}
                    </div>
                  </div>
                </div>
              </div>
            )
          }) : ''
          }
        </div>
      </div>
    </div>
  );
}

export default DataFeed;
