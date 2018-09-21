import React from 'react';
import { View, StyleSheet } from 'react-native';
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
    }
  }

  componentDidMount() {
    data.postsRef.on('value', (snapshot) => {
      let val = snapshot.val();
      let items = Object.values(val);
      this.setState({posts:items});
    });
  }

  onRequestDetails(request) {
    this.props.navigation.navigate('RequestDetails',{post:request,posts:this.state.posts});
  }

  render() {
    let requests = this.state.posts.map((item) => {
      if (!item.receiver) {
        return <ListItem key={item.id} subtitle={item.location}
        title={item.quantity+' kg '+item.product} onPressRightIcon={()=>this.onRequestDetails(item)}/>
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