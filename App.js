import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import DashBoard from './components/dashboard';
import CreatePost from './components/createpost';
import PostLists from './components/postlists';
import Profile from './components/profile';

export default class App extends React.Component {
  render() {
    return (
      <RootStack/>
    );
  }
}

const RootStack = createStackNavigator(
  {
    DashBoard: DashBoard,
    CreatePost: CreatePost,
    PostLists: PostLists,
    Profile: Profile,
  },
  {
    initialRouteName: 'DashBoard',
    navigationOptions: {
      headerLeft: (<Icon name='menu' color='#fff'/>),
      headerStyle: {
        backgroundColor: '#42b97c',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);