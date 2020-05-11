import React, { useEffect, useState } from 'react';

import { useAuth } from '../../contexts/AuthContext';

import './styles.css';

export default function Login() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const { signIn, user } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    await signIn(username, password);

    console.log(user);

  };

  useEffect(() => {
    
  }, []);

  return (
    <div className="container">
      <form onSubmit={handleLogin}>

        <input
          placeholder="email or username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
        <button type="submit">login</button>

      </form>
    </div>
  );
}
