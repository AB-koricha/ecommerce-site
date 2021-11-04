// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyCc2sBadENzmtB-sqsLFcR3-KLyPHZRJ-o",
    authDomain: "kokoshop-52d97.firebaseapp.com",
    projectId: "kokoshop-52d97",
    storageBucket: "kokoshop-52d97.appspot.com",
    messagingSenderId: "664414450677",
    appId: "1:664414450677:web:3a0be70c00d5d306e2e6bc",
    measurementId: "G-S7N7QP6SSS"
  };

  const firebaseApp=firebase.initializeApp(firebaseConfig)
  const db=firebaseApp.firestore()
  const auth=firebase.auth()

  export {db,auth}