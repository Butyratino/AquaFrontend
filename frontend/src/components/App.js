// src/components/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomeForm from './WelcomeForm';
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm';
import Sidebar from './Sidebar.js';




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomeForm />} />
        <Route path="/registration" element={<RegistrationForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/sidebar" element={<Sidebar />} />
      </Routes>
    </Router>
  );
}



export default App;
