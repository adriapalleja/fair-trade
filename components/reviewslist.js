import React from 'react';
import { ScrollView, Text, Button, AsyncStorage, StyleSheet } from 'react-native';
import { List, Card } from 'react-native-elements'
import * as data from  '../containers/firebase';

export default class RequestsList extends React.Component {
  static navigationOptions = {
    title: 'Your Reviews',
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

  onReviewEdition(post) {
    this.props.navigation.navigate('ReviewDetails',{post:post});
  }

  render() {
    let requests = this.state.posts.map((item) => {
      if (item.receiver===this.state.user_id) {
        return <Card image={{uri:item.img}} key={item.id} title={item.product+' '+item.quantity+' kg'}>
        <Text style={{textAlign:'center'}}>{item.location}</Text>
        <Button color='#42b97c' title='Review Product'
          onPress={()=>this.onReviewEdition(item)}/>
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