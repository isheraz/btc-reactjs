const firebase = require('firebase-admin');

const serviceAccount = require('../service-account.json');

console.log(process.env.DATABASE_URL);
firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: process.env.DATABASE_URL,
});

const db = firebase.firestore();

module.exports = db;
