import React from 'react';
import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import UltrafiltrationScreen from '../screens/UltrafiltrationScreen';
import Form from '../src/Form';

const AuthStack = createStackNavigator({ Login: LoginScreen, Signup: SignupScreen});

const UltrafiltrationStack = createStackNavigator({UF: UltrafiltrationScreen});

export default createAppContainer(
  createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Main: MainTabNavigator,
    Auth: AuthStack,
    AuthLoading: AuthLoadingScreen,
    Ultrafiltration: UltrafiltrationStack,
    Login: LoginScreen,
    Signup: SignupScreen,
  },
  {
    initialRouteName: 'AuthLoading',
  })


);
