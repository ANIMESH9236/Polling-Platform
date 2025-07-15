import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './PublicPolls.css';

export default function PublicPolls() {
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    const allPolls = JSON.parse(localStorage.getItem('polls') || '[]');
    setPolls(allPolls);
  }, []);

  return (
    <div className="public-polls-container">
      <h2>📢 Public Polls</h2>
      {polls.length === 0 ? (
        <p className="no-polls-msg">No public polls available yet.</p>
      ) : (
        <ul className="polls-list">
          {polls.map((poll) => (
            <li key={poll.id} className="poll-item">
              <div className="poll-title">{poll.title}</div>
              <Link className="view-link" to={`/poll/${poll.id}`}>
                View & Vote →
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
