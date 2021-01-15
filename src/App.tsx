import React from 'react';
import { Link } from 'react-router-dom';
import './assets/main.css';
import AuthRoute from './routes/authRoute';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ul>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </ul>
      </header>
      <AuthRoute />
    </div>
  );
}

export default App;
