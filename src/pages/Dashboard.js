import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, logoutUser } from '../components/Auth';
import CreatePoll from '../components/CreatePoll';

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
    <div style={{ padding: '20px' }}>
      <h2>Dashboard</h2>
      <p>Welcome, {user} <button onClick={handleLogout}>Logout</button></p>

      <hr />

      <h3>Create a Poll</h3>
      <CreatePoll />

      <hr />

      <h3>My Polls</h3>
      {userPolls.length === 0 ? (
        <p>You haven’t created any polls yet.</p>
      ) : (
        <ul>
          {userPolls.map(poll => (
            <li key={poll.id}>
              <a href={`/poll/${poll.id}`}>{poll.title}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
