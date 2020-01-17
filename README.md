## ios-web
ios-web aims to emulate certain key ui interactions, microinteractions, and functionality of iOS 13. It aims to provide clarity into the feasibility of reproducing iOS and mobile interactions and their performance in modern browsers.

All interactions are done with pure vanilla Javascript and CSS3 animations. All icons and animated icons were reproduced using CSS or small svg files for performance.

## Available Functionality
- iOS Lock Screen with live time and animations
- Camera (from Lock Screen)
  - Take pictures (Web RTC)
  - Transition to image stack
  - Timers
  - Flash (front only as it is on your local machine)

## WIP Functionality
- Camera (from Lock Screen)
  - Live Photos (WebGL / GIF)
  - Effects (WebGL)
  - Video (WebGL)
- Unlock Screen
  - Screen unlock (PIN - small batch of code committed but commented out)


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