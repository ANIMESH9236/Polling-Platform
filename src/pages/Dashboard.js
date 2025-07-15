import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getCurrentUser, logoutUser } from '../components/Auth';
import CreatePoll from '../components/CreatePoll';
import './Dashboard.css';

export default function Dashboard() {
  const [userPolls, setUserPolls] = useState([]);
  const navigate = useNavigate();
  const user = getCurrentUser();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      const polls = JSON.parse(localStorage.getItem('polls') || '[]');
      const filtered = polls.filter(poll => poll.createdBy === user);
      setUserPolls(filtered);
    }
  }, [user]);

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Welcome, {user}</h2>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>

      <div className="section create-poll-section">
        <h3>Create a Poll</h3>
        <CreatePoll />
      </div>

      <div className="section user-polls-section">
        <h3>My Polls</h3>
        {userPolls.length === 0 ? (
          <p>You haven’t created any polls yet.</p>
        ) : (
          <ul>
            {userPolls.map(poll => (
              <li key={poll.id}>
                <Link to={`/poll/${poll.id}`}>{poll.title}</Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
