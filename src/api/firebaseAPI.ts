import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const db = firebase.firestore();
export const firestore = firebase.firestore;
export const storage = firebase.storage();
export const storageUserRef = storage.ref().child('users');
export const storagePostsRef = storage.ref().child('posts');

export const getUsersCollection = db.collection('users');
export const getUsersChatCollection = db.collection('usersChat');
export const getPostsCollection = db.collection('posts');

export const getUserDoc = (userId: string) =>
  db.collection('users').doc(userId!);

export const createAccount = (email: string, password: string) =>
  auth.createUserWithEmailAndPassword(email, password);

export const signinInAccount = (email: string, password: string) =>
  auth.signInWithEmailAndPassword(email, password);

export const putUserPhoto = (userId: string, file: any) =>
  storageUserRef.child(userId).child('photo').put(file);

export const getUserPhoto = (userId: string) =>
  storageUserRef.child(userId).child('photo').getDownloadURL();

export const getUserPhotoRef = (userId: string) =>
  storageUserRef.child(userId).child('photo');

export const putPostPhoto = (userId: string, file: any, photoId: string) =>
  storagePostsRef.child(userId).child(photoId).put(file);
