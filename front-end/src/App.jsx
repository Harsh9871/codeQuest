// src/App.jsx
import React from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Checkemail from './pages/Checkemail';
import CreateAccoutDetails from './auth/CreateAccoutDetails';
import UserDetails from './pages/UserDetails';
import TeacherDetails from './pages/TeacherDetails';
import { Routes, Route } from 'react-router-dom';
import './App.css';
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/checkemail" element={<Checkemail />} />
        <Route path="/verifyEmail/:token" element={<CreateAccoutDetails />} />
        <Route path="/userDetails" element={UserDetails}/>
        <Route path="/TeacherDetails" element={TeacherDetails}/>

      </Routes>
    </>
  );
}

export default App;
