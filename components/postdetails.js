import React from 'react';
import { View, Alert, StyleSheet, Button } from 'react-native';
import { FormLabel, FormInput } from 'react-native-elements';
import * as data from  './../containers/firebase';

export default class PostDetails extends React.Component {
  static navigationOptions = {
    title: 'Product Details',
  };

  constructor(props) {
    super(props);
    this.state = {
      post: {}
    }
  }

  componentDidMount() {
    const { navigation } = this.props;
    const postId = navigation.getParam('id', 'NO-ID');
    data.db.ref('/posts/'+postId).on('value', (snapshot) => {
      let val = snapshot.val();
      this.setState({post:val});
    });
  }

  editProduct() {
    const res = data.editProduct(this.state.post);
    if (res) {
      Alert.alert('Post edited!');
      this.props.navigation.goBack();
    } else Alert.alert('Fields still required');
  }

  render(){
    return (
      <View style={styles.container}>
        <FormLabel>Product</FormLabel>
        <FormInput value={this.state.post.product} 
          onChangeText={(text)=>this.setState(prevState=>({post: {...prevState.post,product:text}}))}/>

        <FormLabel>Quantity (kg)</FormLabel>
        <FormInput value={this.state.post.quantity} keyboardType='numeric'
          onChangeText={(text)=>this.setState(prevState=>({post: {...prevState.post,quantity:text}}))}/>

        <FormLabel>Price (eur per kg)</FormLabel>
        <FormInput value={this.state.post.price} keyboardType='numeric'
          onChangeText={(text)=>this.setState(prevState=>({post: {...prevState.post,price:text}}))}/>

        <FormLabel>Location</FormLabel>
        <FormInput value={this.state.post.location} 
          onChangeText={(text)=>this.setState(prevState=>({post: {...prevState.post,location:text}}))}/>
      
        <Button color='#42b97c' title="Edit Post" onPress={() => this.editProduct()}/>
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