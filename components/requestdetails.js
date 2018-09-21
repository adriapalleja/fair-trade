import React from 'react';
import { View, AsyncStorage, StyleSheet, Button } from 'react-native';
import { FormLabel } from 'react-native-elements';
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

  _checkInterested = async () => {
    const { navigation } = this.props;
    const postId = navigation.getParam('id', 'NO-ID');
    const user_id = await AsyncStorage.getItem('userToken');
    const post = this.state.post;
    if (post.interested && !post.interested.includes(user_id)) post.interested.push(user_id)
    else post.interested = [user_id];
    data.db.ref('/posts/'+postId).set(post);
  }

  render(){
    let user = this.state.users.length ? this.state.users.find((user)=>user.id===this.state.post.poster_id) : '';

    return (
      <View style={styles.container}>
        <FormLabel>Producer</FormLabel>
        <FormLabel>Full Name: {user.full_name}</FormLabel>
        <FormLabel>NIF: {user.nif_number}</FormLabel>
        <FormLabel></FormLabel>
        <FormLabel>{this.state.post.product} </FormLabel>
        <FormLabel>{this.state.post.quantity} kg</FormLabel>
        <FormLabel>{this.state.post.price} eur per kg</FormLabel>
        <FormLabel>{this.state.post.location}</FormLabel>
        <Button color='#42b97c' title="Interested" onPress={this._checkInterested}/>
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