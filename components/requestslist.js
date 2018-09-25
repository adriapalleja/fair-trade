import React from 'react';
import { ScrollView, Text, Button, StyleSheet } from 'react-native';
import { List, Card } from 'react-native-elements'
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
        return <Card image={{uri:item.img}} key={item.id} title={item.product+' '+item.quantity+' kg'}>
        <Text style={{textAlign:'center'}}>{item.location}</Text>
        <Button color='#42b97c' title='Post Details'
          onPress={()=>this.onRequestDetails(item)}/>
            </Card>
      }
    });

    return (
      <ScrollView style={styles.container}>
        <List containerStyle={styles.listContainer}>
         {requests}
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