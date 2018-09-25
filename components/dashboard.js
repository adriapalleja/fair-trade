import React from 'react';
import { AsyncStorage, StyleSheet, View } from 'react-native';
import Dashboard from 'react-native-dashboard';
import * as notification from  './../containers/notifications';

const items = [
  { name: 'Create Post', background: '#42b97c', icon: 'share', route: 'CreatePost' },
  { name: 'Your Posts', background: '#42b97c', icon: 'tags', route: 'PostsList' },
  { name: 'Available Requests', background: '#42b97c', icon: 'shopping-basket', route: 'RequestsList' },
  { name: 'Your Reviews', background: '#42b97c', icon: 'thumbs-up', route: 'ReviewsList' },
  { name: 'Edit Profile', background: '#42b97c', icon: 'group', route: 'Profile' },
  { name: 'Log Out', background: '#42b97c', icon: 'lock', route: 'Logout' },
];

export default class DashBoard extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };

  _card = el => {
    if(el.route === 'Logout') this._onLogOut();
    else this.props.navigation.navigate(el.route);
  }

  componentDidMount() {
    this._callRegister();
  }

  _callRegister = async() => {
    const user_id = await AsyncStorage.getItem('userToken');
    await notification.registerForPushNotificationsAsync(user_id);
  }

  render() {
    return (
      <View style={styles.container}>
        <Dashboard items={items} background={true} card={this._card} column={2} />
      </View>
    );
  }

  _onLogOut = async () => {
    await AsyncStorage.removeItem('userToken');
    this.props.navigation.navigate('Auth');
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d9f1e4',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});