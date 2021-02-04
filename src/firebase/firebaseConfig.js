import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDERZ1Js53e1z7xOQjslHSf2Co0s21CTiA",
    authDomain: "juanevillam-instagram-clone.firebaseapp.com",
    projectId: "juanevillam-instagram-clone",
    storageBucket: "juanevillam-instagram-clone.appspot.com",
    messagingSenderId: "475087324192",
    appId: "1:475087324192:web:356c58c6abdf2de1ae6845"
};

firebase.initializeApp( firebaseConfig );

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { auth, db, storage, googleAuthProvider, firebase };

