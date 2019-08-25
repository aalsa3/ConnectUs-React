import * as firebase from 'firebase'

export const createUser = (email, password) => {
    console.log("CreatEuSER HAS BEEN CALLED")
    firebase.auth().createUserWithEmailAndPassword(email, password).catch((error) => console.log(error));
}