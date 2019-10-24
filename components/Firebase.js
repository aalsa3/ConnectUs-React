import React from "react";
import * as firebase from "firebase";
import 'firebase/firestore';
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

export class setUser extends React.Component {
  constructor(props) {
    super(props);
  }
  static registrationInfo = {
    // Store the registration info to the state
    displayName: "",
    email: ""
  };

  // Returns the display name of the user
  static getDisplayName() {
    return setUser.registrationInfo.displayName;
  }
}

// Create a user using firebase using email and password
export const createUser = (email, password) => {
  var displayName = setUser.registrationInfo.displayName;
  var email = setUser.registrationInfo.email;
  var db = firebase.firestore();

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then( (user) => {
      const userID = user.user.uid;
      const userRef = db.collection("users").doc(userID);
      userRef.set({
        displayName,
        email
      });
    })
    .catch(error => Alert.alert('Error', JSON.stringify(error.message).replace(/['"]+/g, '')));
};

// Sign the user in
export const signInUser = (email, password) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch(error => Alert.alert('Error', JSON.stringify(error.message).replace(/['"]+/g, '')));
};

export const getUser = () => {};

// User logout
export const logoutUser = () => {
  firebase.auth().signOut();
};
