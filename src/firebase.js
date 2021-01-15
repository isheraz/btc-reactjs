import firebase from 'firebase/app';
import config from './config';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

firebase.initializeApp(config.firebaseConfig);
firebase.firestore().settings({ timestampsInSnapshots: true });

const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();

export { auth, firestore, storage };
