import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDJrH9QejpqvTn7zAASQ3AN2RomSlPHHtA",
    authDomain: "arvis-98ba3.firebaseapp.com",
    projectId: "arvis-98ba3",
    storageBucket: "arvis-98ba3.appspot.com",
    messagingSenderId: "694296321768",
    appId: "1:694296321768:web:7653b836bb69485be2f35d",
    measurementId: "G-XP385FXXKY"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  export default firebase;
