import React from 'react';
import { View, Text, Button, AsyncStorage, StyleSheet } from 'react-native';
import { List, Card } from 'react-native-elements'
import * as data from  '../containers/firebase';
import axios from 'axios';

const APP_ID = 'd893796f899f3899e6b9878cc2cd1e3327b26111967a6c92b62da9df52194989';

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
      this._getImages(items);
    });
    this._getUser();
  }

  async _getImages(items) {
    items.forEach((item)=>{
      axios.get('https://api.unsplash.com/search/photos/?query='+item.product+'&client_id=' + APP_ID)
		.then(data => {
      item.img = data.data.results[0].links.download;
      this.setState({posts:items});
		}).catch(err => {
			console.log('Error happened during fetching!', err);
		});
    })
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
        <Text>{subtitle}</Text>
        <Button icon={{name: 'code'}} color='#42b97c' title='Post Details'
          onPress={()=>this.onProductDetails(item)}/>
            </Card>
      }
    });

    return (
      <View style={styles.container}>
        <List containerStyle={styles.listContainer}>
         {posts}
        </List>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d9f1e4',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
  listContainer: {
    maxWidth: 400
  }
});