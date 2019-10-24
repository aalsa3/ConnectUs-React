import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TextInput,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert
} from "react-native";

import * as Firebase from "../components/Firebase";
import firebase from 'firebase';
import { withNavigation } from 'react-navigation';


class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConf: "",
    };
  }

  static navigationOptions = {
    title: "Form"
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
        const {firstName, lastName, password, passwordConf} = this.state;
        if (password != passwordConf){
          Alert.alert('Error', 'Passwords do not match!\n\nPassword must be 6 or more characters.')
        }
        else {
        Firebase.setUser.registrationInfo.email = this.state.email;
        Firebase.setUser.registrationInfo.displayName = firstName + " " + lastName;
        Firebase.createUser(this.state.email, this.state.password);
        }

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
        <View style = {styles.formContainerSignup}>

          {/* First Name Form */}
          <TextInput
            style={styles.inputBoxSignUp}
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
            style={styles.inputBoxSignUp}
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
            style={styles.inputBoxSignUp}
            underlineColorAndroid="rgba(0,0,0,0)"
            placeholder="Email Address"
            placeholderTextColor="black"
            onChangeText={text => this.setState({ email: text })}
            value={this.state.email}
            keyboardType="email-address"
            autoCapitalize = "none"
            onSubmitEditing={() => this.password.focus()}
          />

          {/* Password */}
          <TextInput
            style={styles.inputBoxSignUp}
            underlineColorAndroid="rgba(0,0,0,0)"
            placeholder="Password"
            placeholderTextColor="black"
            onChangeText={text => this.setState({ password: text })}
            value={this.state.password}
            secureTextEntry={true}
            autoCapitalize = "none"
            ref={input => (this.password = input)}
          />

          {/* Confirm Password */}
          <TextInput
            style={styles.inputBoxSignUp}
            underlineColorAndroid="rgba(0,0,0,0)"
            placeholder="Confirm Password"
            placeholderTextColor="black"
            onChangeText={text => this.setState({ passwordConf: text })}
            value={this.state.passwordConf}
            secureTextEntry={true}
            autoCapitalize = "none"
            ref={input => (this.passwordConf = input)}
          />

          <TouchableOpacity style={styles.buttonSignUp} onPress={() => this.submit()}>
            <Text style={styles.buttonText}>{this.buttonText()}</Text>
          </TouchableOpacity>

        </View>

        
      );
    }
    else if (this.props.type == "login") {
      return (
        <KeyboardAvoidingView style={styles.formContainer}>
          {/* Email Address Form */}
          <TextInput
            style={styles.inputBox}
            underlineColorAndroid="rgba(0,0,0,0)"
            placeholder="Email Address"
            placeholderTextColor="black"
            onChangeText={text => this.setState({ email: text })}
            value={this.state.email}
            keyboardType="email-address"
            autoCapitalize = "none"
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
            autoCapitalize = "none"
            ref={input => (this.password = input)}
          />

          <TouchableOpacity style={styles.button} onPress={() => this.submit()}>
            <Text style={styles.buttonText}>{this.buttonText()}</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
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
  inputBoxSignUp: {
    flex: 2,
    maxHeight: 60,
    width: 300,
    backgroundColor: "#e0e0e0",
    borderRadius: 25,
    paddingHorizontal: 16,
    marginVertical: 5,
    fontSize: 16,
  },
  formContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    
  },
  formContainerSignup: {
    flex: 7,
    paddingTop: 5,
    flexDirection: 'column',
    justifyContent: "center",
    alignItems: "center",
    alignSelf: 'flex-start',
    alignContent: 'flex-start',

  },
  button: {
    backgroundColor: "#4dd0e1",
    borderRadius: 25,
    width: 300,
    marginVertical: 10,
    paddingVertical: 16
  },
  buttonSignUp: {
    flex: 2,
    maxHeight: 60,
    backgroundColor: "#4dd0e1",
    borderRadius: 25,
    width: 300,
    marginVertical: 10,
    paddingVertical: 10,
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 24,
    fontWeight: "500",
    color: "#fff",
    textAlign: "center",
    textAlignVertical: 'center'
  },
  buttonTextSignup: {
    fontSize: 24,
    fontWeight: "500",
    color: "#fff",
    textAlign: "center"
  }
});
