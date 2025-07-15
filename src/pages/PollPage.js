import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCurrentUser } from '../components/Auth';
import ResultChart from '../components/ResultChart';

export default function PollPage() {
  const { pollId } = useParams();
  const [poll, setPoll] = useState(null);
  const [selectedOption, setSelectedOption] = useState('');
  const [hasVoted, setHasVoted] = useState(false);
  const [error, setError] = useState('');

  const currentUser = getCurrentUser();

  useEffect(() => {
    const polls = JSON.parse(localStorage.getItem('polls') || '[]');
    const found = polls.find(p => p.id === pollId);
    if (found) {
      setPoll(found);

      // Check if user has already voted
      const votes = JSON.parse(localStorage.getItem('votes') || '{}');
      if (votes[currentUser]?.includes(pollId)) {
        setHasVoted(true);
      }
    }
  }, [pollId, currentUser]);

  const handleVote = () => {
    if (!currentUser) {
      setError('You must be logged in to vote.');
      return;
    }
    if (selectedOption === '') {
      setError('Please select an option.');
      return;
    }

    const polls = JSON.parse(localStorage.getItem('polls') || '[]');
    const updatedPolls = polls.map(p => {
      if (p.id === poll.id) {
        const newOptions = p.options.map((opt, idx) => {
          if (idx.toString() === selectedOption) {
            return { ...opt, votes: opt.votes + 1 };
          }
          return opt;
        });
        return { ...p, options: newOptions };
      }
      return p;
    });

    localStorage.setItem('polls', JSON.stringify(updatedPolls));
    setPoll(updatedPolls.find(p => p.id === poll.id));
    setHasVoted(true);

    // Store user's vote
    const votes = JSON.parse(localStorage.getItem('votes') || '{}');
    if (!votes[currentUser]) votes[currentUser] = [];
    votes[currentUser].push(poll.id);
    localStorage.setItem('votes', JSON.stringify(votes));
  };

  if (!poll) return <p>Loading poll...</p>;

  const totalVotes = poll.options.reduce((sum, opt) => sum + opt.votes, 0);

  return (
    <div style={{ padding: '20px' }}>
      <h2>{poll.title}</h2>
        <p>Share this poll:
        <input
            type="text"
            value={window.location.href}
            readOnly
            style={{ width: '60%', marginLeft: '10px' }}
        />
        <button
            onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            alert("Poll link copied to clipboard!");
            }}
            style={{ marginLeft: '10px' }}
        >
            Copy Link
        </button>
        </p>


      {hasVoted ? (
        <>
          <h3>Results:</h3>
          <ul>
            {poll.options.map((opt, idx) => {
              const percent = totalVotes
                ? ((opt.votes / totalVotes) * 100).toFixed(1)
                : 0;
              return (
                <li key={idx}>
                  {opt.text} - {opt.votes} votes ({percent}%)
                </li>
              );
            })}
          </ul>
          {hasVoted && <ResultChart poll={poll} />}

          <ResultChart poll={poll} />

        </>
      ) : (
        <>
          <h3>Cast Your Vote:</h3>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <form onSubmit={(e) => { e.preventDefault(); handleVote(); }}>
            {poll.options.map((opt, idx) => (
              <div key={idx}>
                <input
                  type="radio"
                  name="pollOption"
                  value={idx}
                  checked={selectedOption === idx.toString()}
                  onChange={(e) => setSelectedOption(e.target.value)}
                />
                <label>{opt.text}</label>
              </div>
            ))}
            <br />
            <button type="submit">Submit Vote</button>
          </form>
        </>
      )}
    </div>
  );
}
