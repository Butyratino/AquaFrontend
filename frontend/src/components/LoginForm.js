// src/components/LoginForm.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LoginForm.css';
import axios from 'axios';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // const handleLogin = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const response = await fetch('http://localhost:8090/api/auth/login', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         username,
  //         password,
  //       }),
  //     });

  //     if (response.ok) {
  //       alert('Login successful!');
  //     } else {
  //       alert('Login failed. Please try again.');
  //     }
  //   } catch (error) {
  //     console.error('Error during login:', error);
  //   }
  // };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8090/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (response.ok) {
        const token = response.headers.get('Authorization');
        // Save the token for subsequent requests or use it in Axios headers
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        alert('Login successful!');
      } else {
        alert('Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="RegistrationForm">
      <h1 className="RegistrationForm-title">Login</h1>
      <form onSubmit={handleLogin}>
        <div className="RegistrationForm-input-container">
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" value={username} onChange={handleUsernameChange} required />
        </div>

        <div className="RegistrationForm-input-container">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" value={password} onChange={handlePasswordChange} required />
        </div>

        <button type="submit" className="RegistrationForm-button">Login</button>

        <Link to="/" className="RegistrationForm-button-back">Back</Link>
      </form>
    </div>
  );
};

export default LoginForm;
