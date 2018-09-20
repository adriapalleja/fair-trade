import React from 'react';
import { Button, Alert, View, StyleSheet } from 'react-native';
import { FormLabel, Header, FormInput, FormValidationMessage } from 'react-native-elements';
import * as data from  './../containers/firebase';

const uuidv4 = require('uuid/v4');

export default class CreatePost extends React.Component {
  static navigationOptions = {
    title: 'Create Post',
  };

  constructor(props) {
    super(props);
    this.state = {
      product: '',
      quantity: 0,
      price: 0,
      location: ''
    }
  }

  postProduct() {
    const id = uuidv4();
    const res = data.postProduct(id,this.state.product,this.state.quantity,this.state.price,this.state.location);
    if (res) {
      Alert.alert('Product posted!');
      this.props.navigation.goBack();
    } else Alert.alert('Fields still required');
  }

  render() {
    return (
      <View style={styles.container}>

        <FormLabel>Product</FormLabel>
        <FormInput onChangeText={(text)=>this.setState({product: text})}/>
        <FormValidationMessage>This field is required</FormValidationMessage>

        <FormLabel>Quantity</FormLabel>
        <FormInput onChangeText={(text)=>this.setState({quantity: text})} keyboardType='numeric'/>
        <FormValidationMessage>This field is required</FormValidationMessage>

        <FormLabel>Price</FormLabel>
        <FormInput onChangeText={(text)=>this.setState({price: text})} keyboardType='numeric'/>
        <FormValidationMessage>This field is required</FormValidationMessage>

          
        <FormLabel>Location</FormLabel>
        <FormInput onChangeText={(text)=>this.setState({location: text})}/>
        <FormValidationMessage>This field is required</FormValidationMessage>

        <Button color='#42b97c' title="Post Product" onPress={() => this.postProduct()}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d9f1e4',
    alignItems: 'center',
    justifyContent: 'center',
  },
});