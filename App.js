import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase';

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
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
