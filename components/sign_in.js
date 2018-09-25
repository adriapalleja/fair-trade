import React from 'react';
import { Button, View, Alert, AsyncStorage, StyleSheet } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import * as data from  './../containers/firebase';

export default class SignIn extends React.Component {
  static navigationOptions = {
    title: 'Please Sign In',
  };

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
  }

  render(){
    return (
      <View style={styles.container}>
        <FormLabel>Username</FormLabel>
        <FormInput onChangeText={(text)=>this.setState({username: text})}/>
        <FormValidationMessage>This field is required</FormValidationMessage>

         <FormLabel>Password</FormLabel>
        <FormInput secureTextEntry={true} onChangeText={(text)=>this.setState({password: text})}/>
        <FormValidationMessage>This field is required</FormValidationMessage>

        <Button color='#42b97c' title="Sign in!" onPress={this._signInAsync} />

        <Button color='#42b97c' title="Sign up!" 
          onPress={() => this.props.navigation.navigate('SignUp')} />
      </View>
    );
  }

  _signInAsync = async () => {
    const res = await data.signInUser(this.state.username, this.state.password);
    if(res.result) {
      await AsyncStorage.setItem('userToken', res.id);
      Alert.alert('Logged in!');
      this.props.navigation.navigate('App');
    } else Alert.alert('Username or password incorrect');
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d9f1e4',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});