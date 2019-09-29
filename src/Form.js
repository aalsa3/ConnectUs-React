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

import * as Firebase from "../components/Firebase";
import firebase from 'firebase';
import { withNavigation } from 'react-navigation';


class Form extends React.Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    title: "Form"
  };

  state = {
    email: "",
    password: "",
  };

  componentDidMount() {
    this.watchAuthState(this.props.navigation);
  }

  watchAuthState(navigation) {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        navigation.navigate('Main');
      }
    });
  }

  submit() {
      if (this.props.type == "signup") {
        const {firstName, lastName} = this.state;
        Firebase.setUser.registrationInfo.email = this.state.email;
        Firebase.setUser.registrationInfo.displayName = firstName + " " + lastName;
        Firebase.createUser(this.state.email, this.state.password);
      }
      else if (this.props.type == "login") {
        Firebase.signInUser(this.state.email, this.state.password)
    }
  }

  buttonText() {
    if (this.props.type == "signup") {
      return "Register";
    }
    else if (this.props.type == "login") {
      return "Login";
  }
  }
  
  render() {
    if (this.props.type == "signup") {
      return (
        <KeyboardAvoidingView style={styles.formContainer} behavior="padding" enabled>
          {/* First Name Form */}
          <TextInput
            style={styles.inputBox}
            underlineColorAndroid="rgba(0,0,0,0)"
            placeholder="First Name"
            placeholderTextColor="black"
            onChangeText={text => this.setState({ firstName: text })}
            value={this.state.firstName}
            keyboardType="default"
            onSubmitEditing={() => this.lastName.focus()}
          />

          {/* Last Name Form */}
          <TextInput
            style={styles.inputBox}
            underlineColorAndroid="rgba(0,0,0,0)"
            placeholder="Last Name"
            placeholderTextColor="black"
            onChangeText={text => this.setState({ lastName: text })}
            value={this.state.lastName}
            keyboardType="default"
            onSubmitEditing={() => this.email.focus()}
          />

          {/* Email Address Form */}
          <TextInput
            style={styles.inputBox}
            underlineColorAndroid="rgba(0,0,0,0)"
            placeholder="Email Address"
            placeholderTextColor="black"
            onChangeText={text => this.setState({ email: text })}
            value={this.state.email}
            keyboardType="email-address"
            onSubmitEditing={() => this.password.focus()}
          />

          {/* Password */}
          <TextInput
            style={styles.inputBox}
            underlineColorAndroid="rgba(0,0,0,0)"
            placeholder="Password"
            placeholderTextColor="black"
            onChangeText={text => this.setState({ password: text })}
            value={this.state.password}
            secureTextEntry={true}
            ref={input => (this.password = input)}
          />

          <TouchableOpacity style={styles.button} onPress={() => this.submit()}>
            <Text style={styles.buttonText}>{this.buttonText()}</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      );
    }
    else if (this.props.type == "login") {
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
            keyboardType="email-address"
            onSubmitEditing={() => this.password.focus()}
          />

          <TextInput
            style={styles.inputBox}
            underlineColorAndroid="rgba(0,0,0,0)"
            placeholder="Password"
            placeholderTextColor="black"
            onChangeText={text => this.setState({ password: text })}
            value={this.state.password}
            secureTextEntry={true}
            ref={input => (this.password = input)}
          />

          <TouchableOpacity style={styles.button} onPress={() => this.submit()}>
            <Text style={styles.buttonText}>{this.buttonText()}</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
}

export default withNavigation(Form);

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
