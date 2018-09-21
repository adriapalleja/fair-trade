import React from 'react';
import { View, Alert, Button, StyleSheet } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import * as data from  './../containers/firebase';

export default class SignUp extends React.Component {
  static navigationOptions = {
    title: 'Sign Up',
  };

  constructor(props) {
    super(props);
    this.state = {
      user: {}
    }
  }

  signUp() {
    const res = data.createUser(this.state.user);
    if(res) {
      Alert.alert('User created. You can sign in');
      this.props.navigation.navigate('SignIn');
    } else Alert.alert('Fields are still required');
  }

  render() {
    return (
      <View style={styles.container}>
        <FormLabel>Full Name</FormLabel>
        <FormInput onChangeText={(text)=>this.setState(prevState=>({user: {...prevState.user,full_name:text}}))}/>
        <FormValidationMessage>This field is required</FormValidationMessage>

        <FormLabel>Username</FormLabel>
        <FormInput onChangeText={(text)=>this.setState(prevState=>({user: {...prevState.user,username:text}}))}/>
        <FormValidationMessage>This field is required</FormValidationMessage>

        <FormLabel>Password</FormLabel>
        <FormInput onChangeText={(text)=>this.setState(prevState=>({user: {...prevState.user,password:text}}))}/>
        <FormValidationMessage>This field is required</FormValidationMessage>

        <FormLabel>Repeat Password</FormLabel>
        <FormInput onChangeText={(text)=>this.setState(prevState=>({user: {...prevState.user,double_pass:text}}))}/>
        <FormValidationMessage>This field is required</FormValidationMessage>

        <FormLabel>Phone Number</FormLabel>
        <FormInput onChangeText={(text)=>this.setState(prevState=>({user: {...prevState.user,phone_number:text}}))}/>
        <FormValidationMessage>This field is required</FormValidationMessage>

        <FormLabel>NIF Number</FormLabel>
        <FormInput onChangeText={(text)=>this.setState(prevState=>({user: {...prevState.user,nif_number:text}}))}/>

        <FormLabel>DUN Number</FormLabel>
        <FormInput onChangeText={(text)=>this.setState(prevState=>({user: {...prevState.user,dun_number:text}}))}/>

        <Button color='#42b97c' title="Create User" onPress={() => this.signUp()} />
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