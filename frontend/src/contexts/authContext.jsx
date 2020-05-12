import React, { createContext, useContext, useState, useEffect } from 'react';

import api from '../services/api';

const AuthContext = createContext({ user: {}, signed: false, signIn: {}, signOut: {} });

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState({});

  const signIn = async (username, password) => {
    let response;
    try {
      response = await api.post('login', { username, password });
      if (response.status === 200) {
        setUser(response.data.user);
        api.defaults.headers.authorization = `Bearer ${response.data.token}`;
        localStorage.setItem('user', JSON.parse(response.data.user));
        localStorage.setItem('token', response.data.token);
      }
    } catch (err) {
      console.log(err);
      return false;
    }
    return true;
  };

  const signOut = () => {
    setUser(null);
    localStorage.clear();
    api.defaults.headers.authorization = '';
  };

  const checkLocalStorage = () => {
    let checkUser = localStorage.getItem('user');
    const checkToken = localStorage.getItem('token');

    if (!checkUser || !checkToken) return false;

    checkUser = JSON.parse(checkUser);

    setUser(checkUser);
    api.defaults.headers.authorization = `Bearer ${checkToken}`;
  
    return Boolean(user);
  };

  useEffect(() => {
    checkLocalStorage();
  }, [checkLocalStorage]);
  return (
    <AuthContext.Provider value={{ user, signed: !!user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};
