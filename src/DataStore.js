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
  cameraActive: false,
  takingPhoto: false,
  effects: {
    active: false,
    effect: 'none'
  },
  camera: {
    flash: 'Off',
    timer: 'Off'
  },
  cameraType: 'photo',
  unlocking: false,
  wrongPasscode: false
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
    case 'takingPhoto':
      return {
        ...state,
        takingPhoto: action.takingPhoto
      }
    case 'toggleEffects':
      return {
        ...state,
        effects: action.effects
      }
    case 'cameraOptions':
      return {
        ...state,
        camera: action.camera
      }
    case 'selectCamera':
      return {
        ...state,
        cameraType: action.cameraType
      }
    case 'resetCamera':
      return {
        ...state,
        cameraActive: false,
        takingPhoto: false,
        effects: {
          active: false,
          effect: 'none'
        },
        camera: {
          flash: 'Off',
          timer: 'Off'
        },
        cameraType: 'photo'
      }
    case 'toggleUnlocking':
      return {
        ...state,
        unlocking: action.unlocking
      }
    case 'toggleWrongPasscode':
      return {
        ...state,
        wrongPasscode: action.wrongPasscode
      }
    default:
      return state;
  }
};

export const Context = React.createContext();
