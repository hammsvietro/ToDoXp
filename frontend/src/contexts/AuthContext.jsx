/* eslint-disable react/prop-types */
/* eslint-disable no-console */


import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from 'react';

import api from '../services/api';

// eslint-disable-next-line object-curly-newline
const AuthContext = createContext({ signed: Boolean, user: {}, token: '', signIn: {}, signOut: {}, loading: Boolean });

export default AuthContext;


export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState();

  const signIn = async (email, password) => {
    let response;
    try {
      response = await api.get('login', { email, password });
      console.log(response.data);
      if (response.status === 200) {
        setUser(response.data);
        localStorage.setItem('user', response.data);
      }
    } catch (error) {
      console.log(error);
      
    }
  };

  const checkLocalStorage = () => {
    const check = localStorage.getItem('user');

    if (!!check) setUser(check);
  };

  useEffect(() => {
    checkLocalStorage();
  }, []);

  return (
    <AuthContext.Provider value={{ signed: !!user, user, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};
