import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

var firebaseConfig = {
  apiKey: 'AIzaSyAg32lF-qbMzegne7i-15zS29oqLGuXZ5o',
  authDomain: 'lite-screen.firebaseapp.com',
  databaseURL: 'https://lite-screen.firebaseio.com',
  projectId: 'lite-screen',
  storageBucket: 'lite-screen.appspot.com',
  messagingSenderId: '993064568858',
  appId: '1:993064568858:web:cdc2bb91db8cf56d8f69a3',
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = firebase.firestore();
