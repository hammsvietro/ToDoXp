import React from 'react';
import { AiOutlineLoading } from 'react-icons/ai';

import { useAuth } from '../../contexts/AuthContext';

import Dashboard from '../Dashboard';
import Login from '../Login';

import './styles.css';

export default function AuthRouter() {
  const { loading, signed } = useAuth();

  if (loading) {
    return (
      <div className="loading">
        <AiOutlineLoading className="loading-icon" size={42} color="" />
        <h1>Loading...</h1>
      </div>
    );
  }

  if (signed) return <Dashboard />;
  return <Login />;
}

