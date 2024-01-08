// src/components/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomeForm from './WelcomeForm';
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm';
import Sidebar from './Sidebar';
import SectionsForm from './SectionsForm';
import Layout from './Layout';
import { UserProvider } from './UserContext'; 
import AddServicesForm from "./AddServicesForm"
import AttractionsForm from "./AttractionsForm"
import UserForm from "./UserForm"
import UserProfile from "./UserProfileForm"
import TicketsForm from "./TicketsForm"
import PaymentsForm from "./PaymentsForm"
import EmployeesForm from "./EmployeesForm"
import SchedulesForm from "./SchedulesForm"

function App() {
  return (
    <Router>
      <UserProvider> {/* Wrap the entire app with UserProvider */}
        <Routes>
          <Route path="/" element={<WelcomeForm />} />
          <Route path="/registration" element={<RegistrationForm />} />
          <Route path="/login" element={<LoginForm />} />
          
          <Route path="/sections" element={<Layout><SectionsForm /></Layout>} />
          <Route path="/addservices" element={<Layout><AddServicesForm /></Layout>} />
          <Route path="/attractions" element={<Layout><AttractionsForm /></Layout>} />
          <Route path="/users" element={<Layout><UserForm /></Layout>} />
          <Route path="/sidebar" element={<Layout><UserProfile /></Layout>} />
          <Route path="/tickets" element={<Layout><TicketsForm /></Layout>} />
          <Route path="/payments" element={<Layout><PaymentsForm /></Layout>} />
          <Route path="/employees" element={<Layout><EmployeesForm /></Layout>} />
          <Route path="/schedules" element={<Layout><SchedulesForm /></Layout>} />

        </Routes>
      </UserProvider>
    </Router>
  );
}

export default App;
