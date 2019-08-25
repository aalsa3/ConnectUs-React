import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TextInput,
  Image,
  TouchableOpacity
} from "react-native";
import { ExpoLinksView } from "@expo/samples";

import AppNavigator from "../navigation/AppNavigator";

import Firebase from '../components/Firebase';

import Form from "../src/Form";
import Logo from "../src/Logo";


import {Actions} from 'react-native-router-flux'

export default class SignupScreen extends React.Component {
  static navigationOptions = {
    title: "Signup"
  };

  state = {
    email: "",
    password: ""
  };

  showMainTabs() {
    return <AppNavigator />;
  }

  goBack() {
    Actions.pop()
  }

  render() {
    return (
      <View style={styles.container}>
        <Logo/>
        <Form type ="Signup"/>

        <View style={styles.signupTextCont}>
          <Text style={styles.signupText}>Already have an account? </Text>
          <TouchableOpacity onPress = {this.goBack}>
            <Text style={styles.signupTextBtn}>Sign In</Text>
          </TouchableOpacity>
        </View>

      </View>
    );
  }
}

SignupScreen.navigationOptions = {
  title: "Signup"
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff"
  },
  signupTextCont: {
    flexGrow: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingVertical: 16,
    flexDirection: 'row',
    fontSize: 16
  },
  signupText: {
    color: "#bdbdbd",
    fontSize: 16
  },
  signupTextBtn: {
    color: "black",
    fontSize: 16,
    fontWeight: '200'
  },
});
