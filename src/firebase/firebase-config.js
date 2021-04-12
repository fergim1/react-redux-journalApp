import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyChMF0aKZMPpu3-xJwkn4V0YZcBwWmNTlM",
    authDomain: "react-journalapp-348b8.firebaseapp.com",
    projectId: "react-journalapp-348b8",
    storageBucket: "react-journalapp-348b8.appspot.com",
    messagingSenderId: "702498139703",
    appId: "1:702498139703:web:34b7e951423edef8e859b2",
    measurementId: "G-6KGX4HNGW9"
  };

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
    db, 
    googleAuthProvider,
    firebase
}


