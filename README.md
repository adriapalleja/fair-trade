![alt text](https://raw.githubusercontent.com/adriapalleja/fair-trade/master/app_icon.png)
# Fair Trade (Sense intermediaris)

## Screenshots

<div align="center">
     <img width= "200px" src="https://raw.githubusercontent.com/adriapalleja/fair-trade/master/screenshots/screenshot_1.png"></img>
     <img width= "200px" src="https://raw.githubusercontent.com/adriapalleja/fair-trade/master/screenshots/screenshot_2.png"></img>
     <img width= "200px" src="https://raw.githubusercontent.com/adriapalleja/fair-trade/master/screenshots/screenshot_3.png"></img>
</div>

## Getting Started

You need the following modules to run the app:

* [Node](https://nodejs.org)

* [Npm](https://www.npmjs.com)

* [Yarn](https://yarnpkg.com)

* [Expo XDE](https://www.expo.io) - the Expo development environment.
  ```npm install -g exp```

## Installation

1. Clone this repo and enter!

```
git clone https://github.com/adriapalleja/fair-trade.git
cd fair-trade
```

2. Install dependencies

```
npm install
```

3. Run the app

Sometimes you may need to reset or clear the React Native packager's cache. To do so, you can pass the `--reset-cache` flag to the start script:

```
yarn start --reset-cache
or
npm start --rest-cache
```
4. Install the Expo client app on your iOS or Android phone and connect to the same wireless network as your computer. On Android, use the [Expo app](https://expo.io) to scan the QR code from your terminal to open your project. On iOS, follow on-screen instructions to get a link.

5. Update your network IP value

6. Run also your backend with 

```
node server/index.js
```

## Tech Stack

* [React-native](https://facebook.github.io/react-native) (Front-end app)

* [Firebase](https://firebase.google.com) (Standard back-end server)

* Koa (Middleware back-end server)

* Expo environment and push notifications server
