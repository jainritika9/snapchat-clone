import firebase from 'firebase'
;
const firebaseConfig = {
    apiKey: "AIzaSyA611qGI9PJOqNfSnJoMqhjWI_mWB2ykVc",
    authDomain: "snapchat-clone-4a1e7.firebaseapp.com",
    projectId: "snapchat-clone-4a1e7",
    storageBucket: "snapchat-clone-4a1e7.appspot.com",
    messagingSenderId: "4650056415",
    appId: "1:4650056415:web:316a1f286271c6fba3076a"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db =firebaseApp.firestore();
  const auth = firebase.auth();
  const Storage =firebase.storage();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {db,auth,Storage,provider};