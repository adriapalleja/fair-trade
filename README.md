![alt text](https://raw.githubusercontent.com/adriapalleja/fair-trade/master/app_icon.png)

# Fair Trade (Sense intermediaris)

Fair Trade is a React Native application tool focused in local producers, giving them the opportunity to post and get interested in local product offers, skipping intermediaries, avoiding waste of non-sell local product and accessing the customer's market from others producers.

<div align="center">
     <img width= "250px" src="https://raw.githubusercontent.com/adriapalleja/fair-trade/master/screenshots/screenshot_1.png"></img>
     <img width= "250px" src="https://raw.githubusercontent.com/adriapalleja/fair-trade/master/screenshots/screenshot_2.png"></img>
     <img width= "250px" src="https://raw.githubusercontent.com/adriapalleja/fair-trade/master/screenshots/screenshot_3.png"></img>
</div>

## Tech Stack

* [React-native](https://facebook.github.io/react-native) (Front-end app)

* [Firebase](https://firebase.google.com) (Standard back-end server)

* Koa (Middleware back-end server)

* Expo environment and push notifications server

## Getting Started

You need the following modules to run the app:

* [Node](https://nodejs.org)

* [Yarn](https://yarnpkg.com)

* [Expo XDE](https://www.expo.io) - the Expo development environment.
  ```npm install -g exp```

## Installation

1. Clone this repo and enter!

```
git clone https://github.com/adriapalleja/fair-trade.git
cd fair-trade
```

2. Install dependencies `npm install`

3. Run the app `yarn start --reset-cache`. Sometimes you may need to reset or clear the React Native packager's cache. To do so, you can pass the `--reset-cache` flag to the start script:

4. Install the Expo client app on your iOS or Android phone and connect to the same wireless network as your computer. On Android, use the [Expo app](https://expo.io) to scan the QR code from your terminal to open your project. On iOS, follow on-screen instructions to get a link.

5. Update your network IP value in containers/constants

6. Run also your backend with `node server/index.js`

## Author

Adrià Pallejà - [Linkedin](https://www.linkedin.com/in/adri%C3%A0-pallej%C3%A0-3876a186/)

## Contributing

Improvements are welcome! Fork the repo and submit a pull request after.
