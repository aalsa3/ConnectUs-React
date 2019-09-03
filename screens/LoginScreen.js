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
import firebase from 'firebase'

import Form from "../src/Form";
import Logo from "../src/Logo";



export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.signup = this.signup.bind(this);
  }

  state = {
    email: "",
    password: ""
  };

  signup() {
    this.props.navigation.navigate('Signup');
  }

  render() {
    return (
      <View style={styles.container}>
        <Logo/>
        <Form type ="login"/>

        <View style={styles.signupTextCont}>
          <Text style={styles.signupText}>Don't have an account? </Text>
          <TouchableOpacity onPress={this.signup}>
            <Text style={styles.signupTextBtn}>Sign Up</Text>
          </TouchableOpacity>
          
        </View>

      </View>
    );
  }
}

LoginScreen.navigationOptions = {
  header: null,
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
