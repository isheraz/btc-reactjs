import firebase from 'firebase/app';
import config from './config';
import 'firebase/firestore';
import 'firebase/auth';

firebase.initializeApp(config.firebaseConfig);
firebase.firestore().settings({ timestampsInSnapshots: true });

const auth = firebase.auth();
const firestore = firebase.firestore();

export { auth, firestore };
