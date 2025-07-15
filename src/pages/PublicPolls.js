import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function PublicPolls() {
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    const allPolls = JSON.parse(localStorage.getItem('polls') || '[]');
    setPolls(allPolls);
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>📢 Public Polls</h2>
      {polls.length === 0 ? (
        <p>No public polls available yet.</p>
      ) : (
        <ul>
          {polls.map((poll) => (
            <li key={poll.id} style={{ marginBottom: '10px' }}>
              <strong>{poll.title}</strong> <br />
              <Link to={`/poll/${poll.id}`}>View & Vote</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
