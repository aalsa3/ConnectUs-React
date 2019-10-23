import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TextInput,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView
} from "react-native";
import { ExpoLinksView } from "@expo/samples";

import Firebase from '../../components/Firebase';

import Form from "../../src/Form";
import Logo from "../../src/Logo";


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
        <KeyboardAvoidingView style = {{height: "95%"}} behavior="padding" enabled>
          <Logo/>
          <Form type ="signup"/>
        </KeyboardAvoidingView>
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
    height: '5%',
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingVertical: 3,
    flexDirection: 'row',
    fontSize: 16,
  },
  signupText: {
    color: "#bdbdbd",
    fontSize: 16,
    textAlign: 'center'
    
  },
  signupTextBtn: {
    color: "black",
    fontSize: 16,
    fontWeight: '200',
    textAlign: 'center'
  },
});
