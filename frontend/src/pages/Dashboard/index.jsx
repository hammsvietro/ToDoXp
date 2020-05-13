import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
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
    console.log(response.data);
    
    if (response.status === 200) {
      
      let arr = todos;
      console.log(arr);
      console.log(id);
      arr = arr.filter((item) => {
        console.log(item.id);
        return item.id !== id;        
      });
      console.log(arr);
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
    <div className="dashboard-page">

      <Navbar variant="dark" expand="large">
        <Navbar.Brand variant="warning">ToDoXp</Navbar.Brand>
        <Button variant="outline-warning" onClick={handleLogout}>logout</Button>
      </Navbar>
      <div className="middle">
        <div className="profile">
          <h1>{user.username}</h1>
          <div className="stats">
            <h2>{user.level}</h2>
            <h2>{user.xp}</h2>
          </div>
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
          <Button variant="outline-warning" onClick={handlePost}>Add</Button>
                  
        </div>
      </div>
      

      <div className="todos-list">
        <ul>
          {todos.map((todo) => (
            <li className="todo" key={todo.id}>
              <div className="todo-header">
                <strong>Title:</strong>
                <p>{todo.title}</p>

                <strong>Difficulty:</strong>
                <p>{todo.difficulty}</p>
              </div>
              <div className="todo-body">
                <strong>Body:</strong>
                <p>{todo.body}</p>
              </div>
              <div className="action-buttons">
                <Button variant="outline-warning" onClick={() => handleMarkAsDone(todo.id)}>
                  <FiCheck size="16" color="#e1ad01" />
                </Button>
                <Button variant="outline-warning">
                  <FiTrash2 size="16" color="#e1ad01" />
                </Button>
              </div>

            </li>
          ))}
        </ul>
      </div>
      
    </div>
  );
}
