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

import * as Firebase from "../components/Firebase";
import firebase from 'firebase';

export default class Form extends React.Component {
  static navigationOptions = {
    title: "Login"
  };

  state = {
    email: "",
    password: ""
  };

  submit() {
      if (this.props.type == "Signup") {
          Firebase.createUser(this.state.email, this.state.password)
      }
  }
  render() {
    return (
        <View style={styles.formContainer}>
          {/* Email Address Form */}
          <TextInput
            style={styles.inputBox}
            underlineColorAndroid="rgba(0,0,0,0)"
            placeholder="Email Address"
            placeholderTextColor="black"
            onChangeText={text => this.setState({ email: text })}
            value={this.state.email}
            keyboardType = "email-address"
            onSubmitEditing = {() => this.password.focus()}
          />

          <TextInput
            style={styles.inputBox}
            underlineColorAndroid="rgba(0,0,0,0)"
            placeholder="Password"
            placeholderTextColor="black"
            onChangeText={text => this.setState({ password: text })}
            value={this.state.password}
            secureTextEntry={true}
            ref = {(input) => this.password = input }
          />

          <TouchableOpacity style={styles.button} onPress={() => this.submit()}>
            <Text style={styles.buttonText}>{this.props.type}</Text>
          </TouchableOpacity>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  Titletext: {
    color: "#4dd0e1",
    fontSize: 28,
    textAlign: "center",
    fontWeight: "500"
  },
  inputBox: {
    width: 300,
    height: 60,
    backgroundColor: "#e0e0e0",
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 16,
    marginVertical: 10
  },
  formContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  signupTextCont: {
    flexGrow: 1,
    alignItems: "flex-end",
    justifyContent: "center",
    paddingVertical: 16,
    flexDirection: "row",
    fontSize: 16
  },
  signupText: {
    color: "#bdbdbd",
    fontSize: 16
  },
  signupTextBtn: {
    color: "black",
    fontSize: 16,
    fontWeight: "200"
  },
  button: {
    backgroundColor: "#4dd0e1",
    borderRadius: 25,
    width: 300,
    marginVertical: 10,
    paddingVertical: 16
  },
  buttonText: {
    fontSize: 24,
    fontWeight: "500",
    color: "#fff",
    textAlign: "center"
  }
});
