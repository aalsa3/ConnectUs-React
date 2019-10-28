import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
  Text
} from 'react-native';

import firebase from 'firebase'
import { booleanLiteral } from '@babel/types';

//
// Used to direct user to either the Main page, or to the Login/Signup page
// Depending on if they are logged in or not
//
export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAppReady : false,
      isLoggedIn: false,
    }
  }

  componentDidMount() {
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate  to our appropriate place
  _bootstrapAsync = async () => {
    setTimeout( async () => {
      const userToken = await AsyncStorage.getItem('userToken');
      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      this.props.navigation.navigate(userToken ? 'Main' : 'Auth');
    }, 1000) 
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text style = {{ textAlign : 'center'}}>Loading</Text>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
}