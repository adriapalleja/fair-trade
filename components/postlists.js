import React from 'react';
import { View, Alert, StyleSheet } from 'react-native';
import { List, ListItem } from 'react-native-elements'
import * as data from  './../containers/firebase';

export default class PostLists extends React.Component {
  static navigationOptions = {
    title: 'Your Active Posts',
  };

  constructor(props) {
    super(props);
    this.state = {
      posts: []
    }
  }

  componentDidMount() {
    data.postsRef.on('value', (snapshot) => {
      let val = snapshot.val();
      let items = Object.values(val);
      this.setState({posts:items});
    });
  }

  onProductDetails(id) {
    this.props.navigation.navigate('PostDetails',{id:id});
  }

  render() {
    return (
      <View style={styles.container}>
        <List containerStyle={styles.listContainer}>
          {this.state.posts.map((item) => (
            <ListItem key={item.id} subtitle={item.quantity+' kg'} 
            title={item.product} onPressRightIcon={()=>this.onProductDetails(item.id)}/>
          ))}
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