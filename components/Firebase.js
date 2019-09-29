import React from "react";
import * as firebase from 'firebase'


export class setUser extends React.Component {
    constructor(props) {
        super(props);
    }

    static registrationInfo = {
        displayName: "",
        email: ""
    };

    static getDisplayName() {
        return setUser.registrationInfo.displayName;
    }
} 

export const createUser = (email, password) => {
    console.log(setUser.registrationInfo.displayName);
    console.log(setUser.registrationInfo.email);
    firebase.auth().createUserWithEmailAndPassword(email, password).catch((error) => console.log(error));
    // .then((res) => {
    //     firebase.database().ref('users/' + res.user.uid).set({

    //     })
    // })
}


export const signInUser = (email, password) => {
    firebase.auth().signInWithEmailAndPassword(email, password).catch((error) => console.log(error));
}


export const getUser = () => {

}

export const logoutUser = () => {
    firebase.auth().signOut()
}