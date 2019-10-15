import React from "react";
import * as firebase from 'firebase';
import 'firebase/firestore';



export const createUser = (email, password) => {
    var displayName = setUser.registrationInfo.displayName;
    var email = setUser.registrationInfo.email;
    var db = firebase.firestore();

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((user) => {
        //const fbRootRefFS = firebase.firestore(); // firebase root reference firestore
        const userID = user.user.uid;
        console.log(userID)
        const userRef = db.collection('users').doc(userID);
        userRef.set ({
            displayName,
            email
        });
      }).catch((error) => console.log(error));
}


export const signInUser = (email, password) => {
    firebase.auth().signInWithEmailAndPassword(email, password).catch((error) => console.log(error));
}



export const getUser = () => {

}

export const logoutUser = () => {
    console.log('logfging')
    firebase.auth().signOut()
}