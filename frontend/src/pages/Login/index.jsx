import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { TextField, Button, AppBar, Toolbar, Typography } from '@material-ui/core';

import { useAuth } from '../../contexts/authContext';
import './styles.css';
import Logo from '../../assets/logo.png';

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
      <AppBar position="static" className="navbar">
        <Toolbar className="items">
          <Typography variant="h6">TODOXP</Typography>
          <Button className="btn" variant="default">Login</Button>
        </Toolbar>
      </AppBar>
      <div className="middle">
        <img src={Logo} alt="logo" />
        <form className="login" onSubmit={handleLogin}>
          <TextField color="primary" label="Username" variant="outlined" onChange={(e) => setUsername(e.target.value)} />
          <TextField label="password" variant="outlined" type="password" onChange={(e) => setPassword(e.target.value)} />
          <Button variant="outlined" color="primary" onClick={handleLogin}>login</Button>
        </form>
      </div>
      
      
    </div>
  );
}
