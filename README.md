## ios-web
ios-web aims to emulate certain key UI interactions, microinteractions (woohoo!), and functional parity of iOS 13. It's bigger goal is to provide clarity into the feasibility of reproducing select iOS interactions (and their FPS performance, especially) in modern browsers.

React is used as its composable and its reusable nature makes it painless to transport components and/or functionality around. For state management, Redux was not used and instead, React v16.8 Context API was used to manufacture the persistent state store.

All interactions are done with pure vanilla Javascript and CSS3 animations. All icons and animated icons were reproduced using pure CSS with 1-2 small svg files.

## Available Functionality
- iOS Lock Screen with live time and animations
- Camera (from Lock Screen)
  - Take photos (Web RTC)
  - Transition to image stack
  - Timers
  - Flash (front only as it is on your local machine)
- PIN Unlock Screen

## WIP Functionality
- Camera (from Lock Screen)
  - Live Photos (WebGL / GIF)
  - Effects (WebGL)
  - Video (WebGL)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Setup

In the project directory, initially run:

### `yarn install`

After installing the required dependencies, you can run the following scripts.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn build`

Builds the app for production to the `build` folder.<br />

NOTE: `yarn build` will only work on a server with SSL as it leverages secured access to device peripherals
