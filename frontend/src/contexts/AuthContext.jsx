/* eslint-disable object-curly-newline */
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
const AuthContext = createContext({ signed: false, user: {}, token: '', signIn: {}, signOut: {}, loading: false });

export default AuthContext;


export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  const signIn = async (username, password) => {
    
    
    let response;
    try {
      response = await api.post('login', {
        username,
        password });
      
      console.log(response.data);
      if (response.status === 200) {
        setUser(response.data.user);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        api.defaults.headers.authorization = `Bearer ${response.data.token}`;
        return true;
      }
    } catch (error) {
      console.log(error);
      
    }

    return false;
  };

  const signOut = async () => {
    console.log('done');
    
    setUser(null);
    localStorage.clear();
    api.defaults.headers.authorization = null;
  };

  const checkLocalStorage = () => {
    const check = localStorage.getItem('user');

    const parsed = JSON.parse(check);

    if (!!check) setUser(parsed);

    setLoading(false);
    
  };

  useEffect(() => {
    checkLocalStorage();

  }, []);

  return (
    <AuthContext.Provider value={{ signed: !!user, user, signIn, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
