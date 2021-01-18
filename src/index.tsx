import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './assets/main.css';
import { FirebaseProvider } from './components/Firebase/context';
import Firebase from './components/Firebase/firebase';

ReactDOM.render(
  <React.StrictMode>
    <FirebaseProvider value={new Firebase()}>
      <App />
    </FirebaseProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
