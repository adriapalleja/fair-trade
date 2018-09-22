import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { List, Card } from 'react-native-elements'
import * as data from  '../containers/firebase';
import axios from 'axios';

const APP_ID = 'd893796f899f3899e6b9878cc2cd1e3327b26111967a6c92b62da9df52194989';

export default class RequestsList extends React.Component {
  static navigationOptions = {
    title: 'Available Requests',
  };

  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    }
  }

  componentDidMount() {
    data.postsRef.on('value', (snapshot) => {
      let val = snapshot.val();
      let items = Object.values(val);
      this._getImages(items);
    });
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

  onRequestDetails(request) {
    this.props.navigation.navigate('RequestDetails',{post:request,posts:this.state.posts});
  }

  render() {
    let requests = this.state.posts.map((item) => {
      if (!item.receiver) {
        return <Card image={{uri:item.img}} key={item.id} title={item.product+' '+item.quantity+' kg'}>
        <Text>{item.location}</Text>
        <Button icon={{name: 'code'}} color='#42b97c' title='Post Details'
          onPress={()=>this.onRequestDetails(item)}/>
            </Card>
      }
    });

    return (
      <View style={styles.container}>
        <List containerStyle={styles.listContainer}>
         {requests}
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