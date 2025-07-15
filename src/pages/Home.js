import React from 'react';
import { Link } from 'react-router-dom';
import { getCurrentUser } from '../components/Auth';
import './Home.css'; 

export default function Home() {
  const user = getCurrentUser();

  return (
    <div className="home-container">
      <h1 className="home-title">🗳️ Real-Time Polling App</h1>
      <p className="home-subtitle">Create polls, vote instantly, and view live results.</p>

      <div className="home-buttons">
        {user ? (
          <>
            <p className="welcome-text">Welcome back, <strong>{user}</strong>!</p>
            <Link to="/dashboard">
              <button className="home-button">Go to Dashboard</button>
            </Link>
          </>
        ) : (
          <>
            <Link to="/login">
              <button className="home-button">Login</button>
            </Link>
            <Link to="/register">
              <button className="home-button">Register</button>
            </Link>
          </>
        )}
        <Link to="/public">
          <button className="home-button secondary">Browse Public Polls</button>
        </Link>
      </div>
    </div>
  );
}
