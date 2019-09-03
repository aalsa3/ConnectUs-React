import * as firebase from 'firebase'

export const createUser = (email, password) => {
    firebase.auth().createUserWithEmailAndPassword(email, password).catch((error) => console.log(error));
}


export const signInUser = (email, password) => {
    firebase.auth().signInWithEmailAndPassword(email, password).catch((error) => console.log(error));
}



export const getUser = () => {

}

export const logoutUser = () => {
    firebase.auth().signOut()
}