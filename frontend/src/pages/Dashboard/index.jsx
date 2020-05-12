import React from 'react';

import { useAuth } from '../../contexts/AuthContext';


export default function Dashboard() {

  const { signOut } = useAuth();

  const handleSignOut = (e) => {
    e.preventDefault();
    signOut();

  };


  return (
    <div>
      <h1>{localStorage.getItem('user')}</h1>
      <button type="submit" onClick={handleSignOut}></button>
    </div>
  )
}