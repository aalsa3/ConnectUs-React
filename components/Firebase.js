import React from "react";
import * as firebase from "firebase";
import 'firebase/firestore';

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
    .catch(error => console.log(error));
};

// Sign the user in
export const signInUser = (email, password) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch(error => console.log(error));
};

export const getUser = () => {};

// User logout
export const logoutUser = () => {
  firebase.auth().signOut();
};
