import React from 'react';
import { AsyncStorage, StyleSheet, View, Button } from 'react-native';

export default class DashBoard extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };

  render() {
    return (
      <View style={styles.container}>
        <Button onPress={()=>this.props.navigation.navigate('CreatePost')} 
          color='#42b97c' title='Create Post' />
        <Button onPress={()=>this.props.navigation.navigate('PostLists')} 
          color='#42b97c' title='Active Posts' />
        <Button onPress={()=>this.props.navigation.navigate('Profile')} 
          color='#42b97c' title='Edit Profile'/>
        <Button onPress={this._onLogOut} 
          color='#42b97c' title='Log Out'/>
      </View>
    );
  }

  _onLogOut = async () => {
    await AsyncStorage.removeItem('userToken');
    this.props.navigation.navigate('Auth');
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d9f1e4',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});