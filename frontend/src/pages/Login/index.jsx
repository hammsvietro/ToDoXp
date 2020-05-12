import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { useAuth } from '../../contexts/authContext';
import './styles.css';

export default function Login() {
  
  const { signIn, signed } = useAuth();

  const history = useHistory();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin(e) {
    e.preventDefault();
    signIn(username, password);
  }
  
  useEffect(() => {
    if (!signed) history.push('/');
    if (signed) history.push('/dashboard');
  }, [signed, history]);

  return (
    <div className="login-page">
      <h1>Login Page</h1>

      <div className="form-div">
        <form onSubmit={handleLogin}>
          <input
            placeholder="Username or Email:"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input 
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
