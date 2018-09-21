import React from 'react';
import { View, AsyncStorage, StyleSheet } from 'react-native';
import { List, ListItem } from 'react-native-elements'
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

  onProductDetails(id) {
    this.props.navigation.navigate('PostDetails',{id:id});
  }

  render() {
    let posts = this.state.posts.map((item) => {
      let length = 0;
      if (item.interested) length = item.interested.length;
      let subtitle = item.receiver ? 'Finished' : length + ' interested';
      if (item.poster_id === this.state.user_id) {
        return <ListItem key={item.id} subtitle={subtitle}
          title={item.product+' '+item.quantity+' kg'} onPressRightIcon={()=>this.onProductDetails(item.id)}/>
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