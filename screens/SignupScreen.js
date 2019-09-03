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

import Firebase from '../components/Firebase';

import Form from "../src/Form";
import Logo from "../src/Logo";


import {Actions} from 'react-native-router-flux'

export default class SignupScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    email: "",
    password: ""
  };


  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
  }

  goBack() {
    this.props.navigation.navigate('Login');
  }

  render() {
    return (
      <View style={styles.container}>
        <Logo/>
        <Form type ="signup"/>

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
