import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
  return (
    <div className="home-container">
      <h1>🗳️ Welcome to Pollify</h1>
      <p className="tagline">Create polls, vote instantly, and view results!</p>

      <div className="cta-buttons">
        <Link to="/dashboard" className="home-btn">Create Poll</Link>
        <Link to="/public" className="home-btn outline">Browse Public Polls</Link>
      </div>

      <div className="features">
        <h3>✨ Features</h3>
        <ul>
          <li>✅ Create multiple-choice polls</li>
          <li>✅ See real-time result charts</li>
          <li>✅ Local authentication (no backend)</li>
          <li>✅ Share polls via direct link</li>
        </ul>
      </div>
    </div>
  );
}
