import React from 'react';
import { View, AsyncStorage, StyleSheet } from 'react-native';
import { List, ListItem } from 'react-native-elements'
import * as data from  '../containers/firebase';

export default class RequestsList extends React.Component {
  static navigationOptions = {
    title: 'Available Requests',
  };

  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      user_id: '',
    }
    this._getUser();
  }

  _getUser = async () => {
    const user_id = await AsyncStorage.getItem('userToken');
    this.setState({user_id:user_id});
  }

  componentDidMount() {
    data.postsRef.on('value', (snapshot) => {
      let val = snapshot.val();
      let items = Object.values(val);
      this.setState({posts:items});
    });
  }

  onReviewEdition(id) {
    // this.props.navigation.navigate('ReviewDetails',{id:id});
  }

  render() {
    let requests = this.state.posts.map((item) => {
      if (item.receiver===this.state.user_id) {
        return <ListItem key={item.id} subtitle={item.location}
        title={item.quantity+' kg '+item.product} onPressRightIcon={()=>this.onReviewEdition(item.id)}/>
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