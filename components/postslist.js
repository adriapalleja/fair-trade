import React from 'react';
import { ScrollView, Text, Button, AsyncStorage, StyleSheet } from 'react-native';
import { List, Card } from 'react-native-elements'
import * as data from  '../containers/firebase';

export default class PostsList extends React.Component {
  static navigationOptions = {
    title: 'Your Posts',
  };

  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      user_id: '',
    }
  }

  componentDidMount() {
    data.postsRef.on('value', (snapshot) => {
      let val = snapshot.val();
      let items = Object.values(val);
      this.setState({posts:items});
    });
    this._getUser();
  }

  async _getUser() {
    const user_id = await AsyncStorage.getItem('userToken');
    this.setState({user_id:user_id});
  }

  onProductDetails(post) {
    this.props.navigation.navigate('PostDetails',{post:post});
  }

  render() {
    let posts = this.state.posts.map((item) => {
    let length = 0;
    if (item.interested) length = item.interested.length;
    let subtitle = item.receiver ? 'Finished' : length + ' interested';
    if (item.poster_id === this.state.user_id) {
      return <Card image={{uri:item.img}} key={item.id} title={item.product+' '+item.quantity+' kg'}>
        <Text style={{textAlign:'center'}}>{subtitle}</Text>
        <Button color='#42b97c' title='Post Details'
          onPress={()=>this.onProductDetails(item)}/>
            </Card>
      }
    });

    return (
      <ScrollView style={styles.container}>
        <List containerStyle={styles.listContainer}>
         {posts}
        </List>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d9f1e4',
  },
  listContainer: {
    maxWidth: 400
  }
});