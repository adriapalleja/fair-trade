import React from 'react';
import { Button, View, AsyncStorage, StyleSheet } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';

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
        <FormInput onChangeText={(text)=>this.setState({password: text})}/>
        <FormValidationMessage>This field is required</FormValidationMessage>

        <Button color='#42b97c' title="Sign in!" onPress={this._signInAsync} />
      </View>
    );
  }

  _signInAsync = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('App');
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