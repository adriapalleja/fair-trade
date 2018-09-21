import React from 'react';
import { Button, Alert, AsyncStorage, View, StyleSheet } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import * as data from  './../containers/firebase';

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

  _postProduct = async () => {
    const user_id = await AsyncStorage.getItem('userToken');
    const res = data.postProduct(user_id, this.state.product,this.state.quantity,this.state.price,this.state.location);
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

        <Button color='#42b97c' title="Post Product" onPress={this._postProduct}/>
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