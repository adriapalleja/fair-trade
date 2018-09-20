import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import firebase from 'firebase';
import HomeScreen from './components/homescreen';
import SecondScreen from './components/second';

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Second: SecondScreen,
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
      headerLeft: (<Icon name='menu' color='#fff'/>),
      headerStyle: {
        backgroundColor: '#42b97c',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);

export default class App extends React.Component {
constructor(props) {
  super(props);
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBXuy-OoNPmJ0IwihwmnkPLp8dcqHaWrh8",
    authDomain: "fairprice-32f08.firebaseapp.com",
    databaseURL: "https://fairprice-32f08.firebaseio.com",
    projectId: "fairprice-32f08",
    storageBucket: "fairprice-32f08.appspot.com",
    messagingSenderId: "176853120503"
  };
  firebase.initializeApp(config);
}

  render() {
    return (
      /* firebase.database().ref('/messages').push() */
      <RootStack/>
    );
  }
}