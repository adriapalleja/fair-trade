import React from 'react';
import { View, Alert, StyleSheet, Button } from 'react-native';
import { FormLabel, FormInput } from 'react-native-elements';
import * as data from  '../containers/firebase';

export default class RequestDetails extends React.Component {
  static navigationOptions = {
    title: 'Product Details',
  };

  constructor(props) {
    super(props);
    this.state = {
      post: {},
      users: [],
    }
  }

  componentDidMount() {
    const { navigation } = this.props;
    const postId = navigation.getParam('id', 'NO-ID');
    data.db.ref('/posts/'+postId).on('value', (snapshot) => {
      let val = snapshot.val();
      this.setState({post:val});
    });
    data.usersRef.on('value', (snapshot) => {
      let val = snapshot.val();
      let items = Object.values(val);
      this.setState({users:items});
    });
  }

  checkInterested() {
    
  }


  render(){
    return (
      <View style={styles.container}>
        <FormLabel>{this.state.post.product} </FormLabel>
        <FormLabel>{this.state.post.quantity} kg</FormLabel>
        <FormLabel>{this.state.post.price} eur per kg</FormLabel>
        <FormLabel>{this.state.post.location}</FormLabel>
        <Button color='#42b97c' title="Interested" onPress={() => this.checkInterested()}/>
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