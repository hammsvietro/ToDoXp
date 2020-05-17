import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { FiTrash2, FiCheck } from 'react-icons/fi';

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

  async function handleMarkAsDone(id) {

    const response = await api.put(`user/${user.id}/todo/${id}`, {
      title, body, difficulty,
    });
    
    if (response.status === 200) {
      
      let arr = todos;
      arr = arr.filter((item) => item.id !== id);
      setTodos(arr);
    }
  }

  async function fetchTodos() {
    try {
      const response = await api.get(`user/${user.id}/todo`);
      
      if (response.status === 200) {
        setTodos([...todos, ...response.data]);
      }
    // eslint-disable-next-line no-empty
    } catch (err) {}
  }

  useEffect(() => {
    if (!signed) history.push('/');
    if (signed) history.push('/dashboard');
  }, [signed, history]);
  
  useEffect(() => {
    fetchTodos();
  }, []);


  return (
    <div className="dashboard">

      <div className="navbar">
        <h1>ToDoXp</h1>
        <Button className="btn" variant="default" onClick={handleLogout}>logout</Button>
      </div>
      
      <div className="middle">
        <div className="profile">
          <h1>{user.username}</h1>
          <div className="stats">

            <h2>{`level: ${user.level}`}</h2>
            <h2>{`XP: ${user.xp}`}</h2>

          </div>
        </div>

        <div className="new-todo">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea 
            value={body}
            maxLength="255"
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
          <Button className="btn" variant="default" onClick={handlePost}>Add</Button>
                  
        </div>
      </div>
      

      <div className="todos-list">
        <ul>
          {todos.map((todo) => (
            <li className="todo" key={todo.id}>
              <div className="todo-info">
                <div className="todo-header">

                  <div className="title">
                    <strong>Title:</strong>
                    <p>{todo.title}</p>
                  </div>

                  <div className="difficulty">
                    <strong>Difficulty:</strong>
                    <p>{todo.difficulty}</p>
                  </div>
                </div>

                <div className="todo-body">
                  <strong>Body:</strong>
                  <p>{todo.body}</p>
                </div>

              </div>

              <div className="action-buttons">
                <Button className="btn" variant="default" onClick={() => handleMarkAsDone(todo.id)}>
                  <FiCheck size="24" />
                </Button>
                <Button className="btn" variant="default">
                  <FiTrash2 size="24" />
                </Button>
              </div>

            </li>
          ))}
        </ul>
      </div>
      
    </div>
  );
}
