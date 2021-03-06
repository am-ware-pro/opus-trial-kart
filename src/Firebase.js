import * as firebase from 'firebase';
import firestore from 'firebase/firestore'
import "firebase/storage";

const settings = {timestampsInSnapshots: true};

const config = {
  apiKey: "AIzaSyCxjTq9V94u7E2oCZEEfoSXOWwX3pyQRWM",
  authDomain: "opus-trial-kart.firebaseapp.com",
  databaseURL: "https://opus-trial-kart.firebaseio.com",
  projectId: "opus-trial-kart",
  storageBucket: "opus-trial-kart.appspot.com",
  messagingSenderId: "197255813140",
  appId: "1:197255813140:web:1822a03962e07168932f01",
  measurementId: "G-6D5F5H2X0H"
};
firebase.initializeApp(config);

firebase.firestore().settings(settings);

export default firebase;
