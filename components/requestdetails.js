import React from 'react';
import { View, AsyncStorage, StyleSheet, Button } from 'react-native';
import { FormLabel } from 'react-native-elements';
import * as data from  '../containers/firebase';
import BASE_URL from './../containers/constants';

export default class RequestDetails extends React.Component {
  static navigationOptions = {
    title: 'Request Details',
  };

  constructor(props) {
    super(props);
    this.state = {
      post: {},
      posts: {},
      users: [],
      user_id: '',
    }
    this._getUser();
  }

  _getUser = async () => {
    const user_id = await AsyncStorage.getItem('userToken');
    this.setState({user_id:user_id});
  }

  componentDidMount() {
    const { navigation } = this.props;
    const post = navigation.getParam('post', {});
    const posts = navigation.getParam('posts',{});
    this.setState({post:post,posts:posts});
    data.usersRef.on('value', (snapshot) => {
      let val = snapshot.val();
      let items = Object.values(val);
      this.setState({users:items});
    });
  }

  _checkInterested = async () => {
    const post = this.state.post;
    if (post.interested && !post.interested.includes(this.state.user_id)) post.interested.push(this.state.user_id)
    else post.interested = [this.state.user_id];
    data.db.ref('/posts/'+post.id).set(post);
    this.setState({post:post});
    fetch(BASE_URL+'/interested', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        poster: this.state.post.poster_id,
        product: this.state.post.product
      }),
    }).then(res=>console.log('request sent')).catch(error => console.log(error));
  }

  _uncheckInterested = async () => {
    const post = this.state.post;
    const index = post.interested.indexOf(this.state.user_id);
    post.interested.splice(index,1);
    data.db.ref('/posts/'+post.id).set(post);
    this.setState({post:post});
  }

  render(){
    let user = this.state.users.length ? this.state.users.find((user)=>user.id===this.state.post.poster_id) : '';
    let pos_reviews = Object.values(this.state.posts).filter((post)=>post.poster_id === user.id && post.review && post.review.positive);
    let neg_reviews = Object.values(this.state.posts).filter((post)=>post.poster_id === user.id && post.review && !post.review.positive);
    let reviews = Object.values(this.state.posts).filter((post)=>post.poster_id === user.id && post.review).map((post)=>{
      return <FormLabel>{Object.keys(this.state.users) ? Object.values(this.state.users).find((user)=>user.id === post.receiver).full_name : ''} : {post.review.text}</FormLabel>
    });
    let interestedButton = this.state.post.interested && this.state.post.interested.includes(this.state.user_id) ?
    <Button color='red' title="No More Interested" onPress={this._uncheckInterested}/> : 
    <Button color='#42b97c' title="Be Interested" onPress={this._checkInterested}/>;
    
    return (
      <View style={styles.container}>
        <FormLabel>Producer Full Name: {user.full_name}</FormLabel>
        <FormLabel>Producer NIF: {user.nif_number}</FormLabel>
        <FormLabel>------- Reviews -------</FormLabel>
        {reviews}
        <FormLabel>{pos_reviews.length} Positive Reviews : {neg_reviews.length} Negative Reviews</FormLabel>
        <FormLabel>------- Product -------</FormLabel>
        <FormLabel>{this.state.post.product} {this.state.post.quantity} kg</FormLabel>
        <FormLabel>{this.state.post.price} eur per kg - {this.state.post.location}</FormLabel>
        {interestedButton}
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