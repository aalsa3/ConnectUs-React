import React from 'react';
import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';
import MixedNavigators from './MixedNavigators'
import LoginScreen from '../screens/Auth/LoginScreen';
import SignupScreen from '../screens/Auth/SignupScreen';
import AuthLoadingScreen from '../screens/Auth/AuthLoadingScreen';
import UltrafiltrationScreen from '../screens/Biomarkers/UltrafiltrationScreen';
import Form from '../src/Form';
import DrawerScreen from './DrawerScreen';
import HowScreen from '../screens/HowScreen';

const AuthStack = createStackNavigator({ Login: LoginScreen, Signup: SignupScreen});


// Main app navigation router
// Creates the main app container that contains several
// containers and sub containers
export default createAppContainer(
  createSwitchNavigator({
    Main: MixedNavigators,
    Auth: AuthStack,
    AuthLoading: AuthLoadingScreen,
    Drawer: DrawerScreen,
    How: HowScreen,
  },
  {
    initialRouteName: 'AuthLoading', // Initially go to the signing in screen
  })


);
