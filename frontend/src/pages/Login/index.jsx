import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { TextField, Button, AppBar, Toolbar, Typography, Grid, Menu, MenuItem, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

import { useAuth } from '../../contexts/authContext';
import './styles.css';
import TopUsers from '../../components/TopUsers';
import Logo from '../../assets/logo.png';
import api from '../../services/api';


function Alert(props) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Login() {
  
  const { signIn, signed } = useAuth();

  const history = useHistory();

  
  /* FOR THE LOGIN BUTTON */

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseLoginMenu = () => {
    setAnchorEl(null);
  };
  

  const desciption = 'ToDoXp is a web application to manage your tasks adding a bit of leveling system\n'
                 + 'When you create a task you can choose a level of difficulty between 1 and \n'
                 + 'that determines how much xp you will gain after completing the task.';

  
  /* FOR THE ALERT */
  const [alert, setAlert] = useState({
    active: false,
    message: '',
  });
  
  const handleCloseAlert = () => {
    setAlert({
      active: false,
      message: '',
    });
  };
  
  
  async function handleLogin(e) {
    e.preventDefault();
    const success = await signIn(username, password);    
    if (!success) {
      setAlert({
        active: true,
        message: 'wrong credentials',
      });
    }
  }

  /* REGISTER */
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerPasswordConfirm, setRegisterPasswordConfirm] = useState('');
  
  const handleRegister = async () => {
    if (registerPassword !== registerPasswordConfirm) {
      setAlert({
        active: true,
        message: 'Password do not match!',
      });
      return false;
    }
    let response;
    try {
      response = await api.post('/user', {
        username: registerUsername,
        email: registerEmail,
        prePassword: registerPassword,
      });

      if (response.status === 200) {
        
        await signIn(registerUsername, registerPassword);
      }
    } catch (error) {
      setAlert({
        active: true,
        message: 'Something went wrong, try again',
      });
      
    }

    return false;
  };

  useEffect(() => {
    if (!signed) history.push('/');
    if (signed) history.push('/dashboard');
  }, [signed, history]);

  return (
    <div className="login-page">
      <AppBar position="fixed" className="navbar">
        <Toolbar className="items">
          <Typography variant="h6" className="title">TODOXP</Typography>
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

        <Grid container justify="space-around" alignItems="center" spacing={4}>

          <Grid item lg="6" sm="8" xs="12" className="grid-item">
            <div className="left-grid">
              <img src={Logo} alt="logo" />
              <p className="description">{desciption}</p>
            </div>
          </Grid>

          <Grid item lg="6" sm="8" xs="12" className="grid-item grid-register">
            
            
            <span>
              {"don't have an account? "}
              <strong>REGISTER!</strong>
            </span>
            
            <form className="register" onSubmit={handleRegister}>
              <TextField className="register-input" color="primary" label="Username" variant="outlined" onChange={(e) => setRegisterUsername(e.target.value)} />
              <TextField className="register-input" color="primary" label="Email" variant="outlined" onChange={(e) => setRegisterEmail(e.target.value)} />
              <TextField className="register-input" label="password" variant="outlined" type="password" onChange={(e) => setRegisterPassword(e.target.value)} />
              <TextField className="register-input" label="password confirm" variant="outlined" type="confirm password" onChange={(e) => setRegisterPasswordConfirm(e.target.value)} />
              <Button className="register-button" variant="outlined" color="primary" onClick={handleRegister}>login</Button>
            </form>
          </Grid>
        </Grid>
      </div>

      <TopUsers />


      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        key={alert.message}
        open={alert.active}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
      >
        <Alert severity="error">{alert.message}</Alert>
      </Snackbar>
    
    </div>
  );
}
