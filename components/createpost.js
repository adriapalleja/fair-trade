import React from 'react';
import { Button, Alert, View, TextInput, StyleSheet } from 'react-native';
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
    Alert.alert(id);
    data.postProduct(id,this.state.product,this.state.quantity,this.state.price,this.state.location);
    this.props.navigation.goBack(); 
  }

  render() {
    return (
      <View style={styles.container}>
        <Button title="Go back"
          onPress={() => this.props.navigation.goBack()}/>

        <TextInput placeholder='Product' onChangeText={(text)=>this.setState({product: text})}
          errorStyle={{ color: 'red' }} errorMessage='This field is required'/>

        <TextInput placeholder='Quantity' onChangeText={(text)=>this.setState({quantity: text})}
          errorStyle={{ color: 'red' }} errorMessage='This field is required' keyboardType='numeric'/>

        <TextInput placeholder='Price' onChangeText={(text)=>this.setState({price: text})}
          errorStyle={{ color: 'red' }} errorMessage='This field is required' keyboardType='numeric'/>
          
        <TextInput placeholder='Location' onChangeText={(text)=>this.setState({location: text})}
          errorStyle={{ color: 'red' }} errorMessage='This field is required'/>

        <Button title="Post Product"
          onPress={() => this.postProduct()}/>
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