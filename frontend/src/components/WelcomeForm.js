// src/components/WelcomeForm.js
import React from 'react';
import { Link } from 'react-router-dom';
import './WelcomeForm.css';

const WelcomeForm = () => {
  return (
    <div className="WelcomeForm">
      <h1 className="WelcomeForm-title">Welcome!</h1>
      <p>Choose an option:</p>
      <Link to="/login" className="WelcomeForm-link">Login</Link>
      <Link to="/registration" className="WelcomeForm-link">Register</Link>
    </div>
  );
};

export default WelcomeForm;
