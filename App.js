import React from 'react';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import DashBoard from './components/dashboard';
import CreatePost from './components/createpost';
import PostLists from './components/postlists';
import PostDetails from './components/postdetails';
import Profile from './components/profile';
import SignIn from './components/sign_in';
import SignUp from './components/sign_up';
import AuthLoading from './components/authloading';

export default class App extends React.Component {
  render() {
    return (
      <RootNavigator/>
    );
  }
}

const RootNavigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoading,
    Auth: createStackNavigator(
      {
        SignIn: SignIn,
        SignUp: SignUp,
      },
      {
        initialRouteName: 'SignIn',
        navigationOptions: {
          headerStyle: {
            backgroundColor: '#42b97c',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        },
      }
    ),
    App: createStackNavigator(
      {
        DashBoard: DashBoard,
        CreatePost: CreatePost,
        PostLists: PostLists,
        PostDetails: PostDetails,
        Profile: Profile,
      },
      {
        initialRouteName: 'DashBoard',
        navigationOptions: {
          headerRight: (<Icon name='menu' color='#fff'/>),
          headerStyle: {
            backgroundColor: '#42b97c',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        },
      }
    ),
  },
  {
    initialRouteName: 'AuthLoading',
  }
);