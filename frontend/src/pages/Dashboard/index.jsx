import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';
import { FiTrash2 } from 'react-icons/fi';

import { useAuth } from '../../contexts/authContext';
import api from '../../services/api';
import './styles.css';

export default function Dashboard() {

  const history = useHistory();

  const { signed, signOut, user } = useAuth();

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [difficulty, setDifficulty] = useState(1);

  const [todos, setTodos] = useState([]);

  function handleLogout(e) {
    e.preventDefault();
    signOut();
  }

  async function handlePost() {
    const response = await api.post(`user/${user.id}/todo`, {
      title, body, difficulty,
    });

    if (response.status === 200) {
      setTodos([...todos, response.data]);
    }
  }

  async function fetchTodos() {
    try {
      const response = await api.get(`user/${user.id}/todo`);
      
      if (response.status === 200) {
        setTodos([...todos, ...response.data]);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (!signed) history.push('/');
    if (signed) history.push('/dashboard');
  }, [signed, history]);
  
  useEffect(() => {
    fetchTodos();
  }, []);


  return (
    <div className="dashboard-page">
      <div className="navbar">
        <h1>DASHBOARD</h1>
        <Button variant="dark" onClick={handleLogout}>Logout</Button>
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
        <Button variant="dark" onClick={handlePost}>Add</Button>
                
      </div>

      <div className="todos-list">
        <ul>
          {todos.map((todo) => (
            <li className="todo" key={todo.id}>
              
              <strong>Title:</strong>
              <p>{todo.title}</p>

              <strong>Body:</strong>
              <p>{todo.body}</p>

              <strong>Difficulty:</strong>
              <p>{todo.difficulty}</p>
            </li>
          ))}
        </ul>
      </div>
      
    </div>
  );
}
