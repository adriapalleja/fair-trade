import React from 'react';
import { View, Alert, AsyncStorage, StyleSheet, Button } from 'react-native';
import { FormLabel, FormInput } from 'react-native-elements';
import * as data from  '../containers/firebase';

export default class Profile extends React.Component {
  static navigationOptions = {
    title: 'Profile Info',
  };

  constructor(props) {
    super(props);
    this.state = {
      user: '',
      users: {},
      posts: {},
    }
  }

  async _getUser() {
    const user_id = await AsyncStorage.getItem('userToken');
    const user = Object.values(this.state.users).find((user)=>user.id===user_id);
    this.setState({user:user});
  }

  componentDidMount() {
    data.usersRef.on('value', (snapshot) => {
      let val = snapshot.val();
      this.setState({users:val});
      this._getUser();
    });
    data.postsRef.on('value', (snapshot) => {
      let val = snapshot.val();
      this.setState({posts:val});
    });
  }

  saveProfile() {
    const res = data.editProfile(this.state.user);
    if (res) {
      Alert.alert('Info edited!');
      this.props.navigation.goBack();
    } else Alert.alert('Fields still required');
  }

  render(){
    let pos_reviews = Object.values(this.state.posts).filter((post)=>post.poster_id === this.state.user.id && post.review && post.review.positive);
    let neg_reviews = Object.values(this.state.posts).filter((post)=>post.poster_id === this.state.user.id && post.review && !post.review.positive);
    
    return (
      <View style={styles.container}>
        <FormLabel>Full Name</FormLabel>
        <FormInput value={this.state.user.full_name} 
          onChangeText={(text)=>this.setState(prevState=>({user: {...prevState.user,full_name:text}}))}/>

        <FormLabel>Phone Number</FormLabel>
        <FormInput value={this.state.user.phone_number} 
          onChangeText={(text)=>this.setState(prevState=>({user: {...prevState.user,phone_number:text}}))}/>

        <FormLabel>NIF</FormLabel>
        <FormInput value={this.state.user.nif_number} 
          onChangeText={(text)=>this.setState(prevState=>({user: {...prevState.user,nif_number:text}}))}/>
        
        <FormLabel>DUN</FormLabel>
        <FormInput value={this.state.user.dun_number} 
          onChangeText={(text)=>this.setState(prevState=>({user: {...prevState.user,dun_number:text}}))}/>
        <FormLabel></FormLabel>
        <FormLabel>{pos_reviews.length} Positive Reviews : {neg_reviews.length} Negative Reviews</FormLabel>

        <Button color='#42b97c' title="Save Profile" onPress={() => this.saveProfile()}/>
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