import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class DashBoard extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };

  render() {
    return (
      <View style={styles.container}>
        <Button onPress={()=>this.props.navigation.navigate('CreatePost')} 
          title='Create Post' />
        <Button onPress={()=>this.props.navigation.navigate('PostLists')} 
          title='Active Posts' />
        <Button onPress={()=>this.props.navigation.navigate('Profile')} 
          title='Edit Profile'
          buttonStyle={{backgroundColor: '#42b97c'}}/>
      </View>
    );
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