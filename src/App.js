// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './components/Homepage';
import Login from './components/Login';
import UserDashboard from './components/UserDashboard';
import EmployeeDashboard from './components/EmployeeDashboard';
import SignIn from './components/SignIn';



const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/user-dashboard" element={<UserDashboard />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
    </Routes>
  </Router>
);

export default App;
