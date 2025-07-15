import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PollPage from './pages/PollPage';
import Register from './pages/Register';
import PublicPolls from './pages/PublicPolls';
import './App.css';
import Navbar from './components/Navbar';

import './styles/main.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/poll/:pollId" element={<PollPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/public" element={<PublicPolls />} />

      </Routes>
    </Router>
  );
}

export default App;
