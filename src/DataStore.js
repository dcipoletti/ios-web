import React from "react";

export const state = {
  userAuthenticated: false,
  dateTime: {
    day: '',
    date: '',
    time: ''
  },
  feedView: false,
  notifications: {
    fetched: false,
    data: {}
  },
  flashlightActive: false,
  cameraActive: true,
  cameraType: 'photo'
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'setDateTime':
      return {
        ...state,
        dateTime: action.dateTime
      }
    case 'fetchNotifications':
      return {
        ...state,
        notifications: action.notifications
      }
    case 'toggleFlashlight':
      return {
        ...state,
        flashlightActive: action.flashlightActive
      }
    case 'toggleCamera':
      return {
        ...state,
        cameraActive: action.cameraActive
      }
    case 'selectCamera':
      return {
        ...state,
        cameraType: action.cameraType
      }
    default:
      return state;
  }
};

export const Context = React.createContext();
