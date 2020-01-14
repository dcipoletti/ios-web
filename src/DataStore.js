import React from "react";

export const state = {
  dateTime: {
    day: 'Sunday',
    date: 'January 1',
    time: '12:00'
  },
  feedView: false,
  notifications: {
    fetched: false,
    data: {}
  }
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
    default:
      return state;
  }
};

export const Context = React.createContext();
