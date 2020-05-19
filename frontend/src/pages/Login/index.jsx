import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { TextField, Button, AppBar, Toolbar, Typography, Grid, Menu, MenuItem, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

import { useAuth } from '../../contexts/authContext';
import './styles.css';
import Logo from '../../assets/logo.png';


function Alert(props) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Login() {
  
  const { signIn, signed } = useAuth();

  const history = useHistory();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  /* FOR THE LOGIN BUTTON */

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseLoginMenu = () => {
    setAnchorEl(null);
  };
  
  
  /* FOR THE ALERT */
  const [alert, setAlert] = useState(false);
  
  const handleCloseAlert = () => {
    setAlert(false);
  };
  
  
  async function handleLogin(e) {
    e.preventDefault();
    const success = await signIn(username, password);    
    if (!success) {
      setAlert(true);
    }
  }
  
  useEffect(() => {
    if (!signed) history.push('/');
    if (signed) history.push('/dashboard');
  }, [signed, history]);


  return (
    <div className="login-page">
      <AppBar position="fixed" className="navbar">
        <Toolbar className="items">
          <Typography variant="h6">TODOXP</Typography>
          <Button className="btn" variant="text" onClick={handleClick}>Login</Button>
          <Menu
            id="login-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleCloseLoginMenu}
            on
          >
            <MenuItem button={false}>
              <TextField color="primary" label="Username" variant="outlined" onChange={(e) => setUsername(e.target.value)} />
            </MenuItem>
            <MenuItem button={false}>
              <TextField label="password" variant="outlined" type="password" onChange={(e) => setPassword(e.target.value)} />
            </MenuItem>
            <MenuItem button={false}>
              <Button variant="outlined" color="primary" onClick={handleLogin}>login</Button>
            </MenuItem>


          </Menu>
        </Toolbar>
      </AppBar>

      <div className="grid">

        <Grid container spacing={1}>

          <Grid item xs={12} sm={6} className="grid-item">
            <img src={Logo} alt="logo" />
          </Grid>

          <Grid item xs={12} sm={6} className="grid-item">
            <form className="register" onSubmit={handleLogin}>
              <TextField color="primary" label="Username" variant="outlined" onChange={(e) => setUsername(e.target.value)} />
              <TextField label="password" variant="outlined" type="password" onChange={(e) => setPassword(e.target.value)} />
              <Button variant="outlined" color="primary" onClick={handleLogin}>login</Button>
            </form>
          </Grid>
        </Grid>
      </div>

      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        key="login failed"
        open={alert}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
      >
        <Alert severity="error">Wrong Credentials</Alert>
      </Snackbar>
    
    </div>
  );
}
