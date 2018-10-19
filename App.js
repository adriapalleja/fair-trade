import React from 'react';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';

import DashBoard from './components/dashboard';
import CreatePost from './components/createpost';
import PostsList from './components/postslist';
import RequestsList from './components/requestslist';
import ReviewsList from './components/reviewslist';
import ReviewDetails from './components/reviewdetails';
import PostDetails from './components/postdetails';
import RequestDetails from './components/requestdetails';
import Profile from './components/profile';
import SignIn from './components/sign_in';
import SignUp from './components/sign_up';
import AuthLoading from './components/authloading';

export default class App extends React.Component {
  render() {
    console.disableYellowBox = true;
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
        PostsList: PostsList,
        RequestsList: RequestsList,
        RequestDetails: RequestDetails,
        ReviewsList: ReviewsList,
        ReviewDetails: ReviewDetails,
        PostDetails: PostDetails,
        Profile: Profile,
      },
      {
        initialRouteName: 'DashBoard',
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
  },
  {
    initialRouteName: 'AuthLoading',
  }
);