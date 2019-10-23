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


export default createAppContainer(
  createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Main: MixedNavigators,
    Auth: AuthStack,
    AuthLoading: AuthLoadingScreen,
    Drawer: DrawerScreen,
    How: HowScreen,
  },
  {
    initialRouteName: 'AuthLoading',
  })


);
