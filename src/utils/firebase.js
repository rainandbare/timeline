//firebase.js
import firebase from 'firebase/app';
import 'firebase/database';

// Initialize Firebase
const config = {
  apiKey: "AIzaSyBLe4WgbrsRrLFAeZqFF8-dVmsMYz8azR4",
  authDomain: "timeline-9f72c.firebaseapp.com",
  databaseURL: "https://timeline-9f72c.firebaseio.com",
  projectId: "timeline-9f72c",
  storageBucket: "timeline-9f72c.appspot.com",
  messagingSenderId: "898258122783"
};
firebase.initializeApp(config);

export const dbRef = firebase.database().ref('/');


// this exports the CONFIGURED version of firebase
export default firebase;

