import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';

import './styles.css';

export default function Dashboard() {

  const history = useHistory();

  const { signed, signOut } = useAuth();

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [difficulty, setDifficulty] = useState(1);

  function handleLogout(e) {
    e.preventDefault();
    signOut();
  }

  useEffect(() => {
    if (!signed) history.push('/');
    if (signed) history.push('/dashboard');
  }, [signed, history]);
  
  return (
    <div className="dashboard-page">
      <div className="navbar">
        <h1>DASHBOARD</h1>
        <button type="submit" onClick={handleLogout}>Logout</button>
      </div>

      <div className="new-todo">

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input 
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />

        <input
          type="number"
          min="0"
          max="4"
          step="1"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}  
        />
        
      </div>
      
    </div>
  );
}
