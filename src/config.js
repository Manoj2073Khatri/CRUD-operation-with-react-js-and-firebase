import firebase from 'firebase';
import 'firebase/firestore';

const settings={timestampsInSnapshots:true}

var firebaseConfig = {
    apiKey: "AIzaSyBvzFOKwrzvLxvjz23yl6lQ1OdOPO7PJFo",
    authDomain: "crudproject-f8d97.firebaseapp.com",
    databaseURL: "https://crudproject-f8d97-default-rtdb.firebaseio.com",
    projectId: "crudproject-f8d97",
    storageBucket: "crudproject-f8d97.appspot.com",
    messagingSenderId: "947142682823",
    appId: "1:947142682823:web:c680a116b675e02a4a36e2",
    measurementId: "G-ML0T9PJMVJ"
    };

  firebase.initializeApp(firebaseConfig);
  firebase.firestore().settings(settings);
  export default firebase;