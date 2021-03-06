import app from 'firebase/app';
import 'firebase/auth';

// Firebase configuration keys
const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID
};

class Firebase {
  /**
   * Initialize firebase app
   * Set firebase auth
   */
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
  }

  // Create user with email and password
  createUser(email, password) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  // User sign in with email and password
  signIn = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  // Sign out user
  signOut = () => this.auth.signOut();

  // Update user password
  updatePassword = (password) => this.auth.currentUser.updatePassword(password);
}

export default Firebase;
