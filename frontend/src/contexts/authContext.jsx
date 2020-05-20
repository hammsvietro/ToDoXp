import React, { createContext, useContext, useState, useEffect } from 'react';

import api from '../services/api';

const AuthContext = createContext({ user: {}, signed: false, token: '', signIn: {}, signOut: {}, checkLocalStorage: {} });

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState({});
  const [token, setToken] = useState('');

  const signIn = async (username, password) => {
    let response;
    console.log('hey hey');
    
    try {
      response = await api.post('login', { username, password });
      if (response.status === 404) {
        return false;
      }
      if (response.status === 200) {
        console.log('200');
        setUser(response.data.user);
        api.defaults.headers.authorization = `Bearer ${response.data.token}`;
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('token', response.data.token);
      }
    } catch (err) {
      console.log(err);
      
      return false;
    }
    return true;
  };

  const signOut = () => {
    setUser({}); 
    localStorage.clear();
    api.defaults.headers.authorization = '';
  };

  const checkLocalStorage = () => {
    let checkUser = localStorage.getItem('user');
    const checkToken = localStorage.getItem('token');
    
    
    if (!checkUser || !checkToken) return setUser({});
    
    checkUser = JSON.parse(checkUser);

    setUser(checkUser);
    setToken(checkToken);
    api.defaults.headers.authorization = `Bearer ${checkToken}`;
    
    return Boolean(user);
  };

  useEffect(() => {
    checkLocalStorage();
  }, []);
  
  return (
    // eslint-disable-next-line max-len
    <AuthContext.Provider value={{ user, token, signed: Object.keys(user).length !== 0, signIn, signOut, checkLocalStorage }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};
