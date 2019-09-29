import React from 'react';
import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import MixedNavigators from './MixedNavigators'
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import UltrafiltrationScreen from '../screens/UltrafiltrationScreen';
import Form from '../src/Form';
import DrawerScreen from './DrawerScreen';

const AuthStack = createStackNavigator({ Login: LoginScreen, Signup: SignupScreen});


export default createAppContainer(
  createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Main: MixedNavigators,
    Auth: AuthStack,
    AuthLoading: AuthLoadingScreen,
    Drawer: DrawerScreen,
    
  },
  {
    initialRouteName: 'AuthLoading',
  })


);
