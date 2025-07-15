import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCurrentUser } from '../components/Auth';
import ResultChart from '../components/ResultChart';
import './PollPage.css'; // ✅ Add CSS

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

      const votes = JSON.parse(localStorage.getItem('votes') || '{}');
      if (votes[currentUser]?.includes(pollId)) {
        setHasVoted(true);
      }
    }
  }, [pollId, currentUser]);

  const handleVote = () => {
    if (!currentUser) return setError('You must be logged in to vote.');
    if (!selectedOption) return setError('Please select an option.');

    const polls = JSON.parse(localStorage.getItem('polls') || '[]');
    const updatedPolls = polls.map(p => {
      if (p.id === poll.id) {
        const newOptions = p.options.map((opt, idx) =>
          idx.toString() === selectedOption
            ? { ...opt, votes: opt.votes + 1 }
            : opt
        );
        return { ...p, options: newOptions };
      }
      return p;
    });

    localStorage.setItem('polls', JSON.stringify(updatedPolls));
    setPoll(updatedPolls.find(p => p.id === poll.id));
    setHasVoted(true);

    const votes = JSON.parse(localStorage.getItem('votes') || '{}');
    if (!votes[currentUser]) votes[currentUser] = [];
    votes[currentUser].push(poll.id);
    localStorage.setItem('votes', JSON.stringify(votes));
  };

  if (!poll) return <p className="poll-loading">Loading poll...</p>;

  const totalVotes = poll.options.reduce((sum, opt) => sum + opt.votes, 0);

  return (
    <div className="poll-page">
      <h2 className="poll-title">{poll.title}</h2>

      <div className="poll-share">
        <label>Share this poll:</label>
        <input type="text" value={window.location.href} readOnly />
        <button
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            alert('Poll link copied to clipboard!');
          }}
        >
          Copy Link
        </button>
      </div>

      {hasVoted ? (
        <div className="poll-results">
          <h3>Results:</h3>
          <ul>
            {poll.options.map((opt, idx) => {
              const percent = totalVotes
                ? ((opt.votes / totalVotes) * 100).toFixed(1)
                : 0;
              return (
                <li key={idx}>
                  <span>{opt.text}</span>
                  <span>{opt.votes} votes ({percent}%)</span>
                </li>
              );
            })}
          </ul>
          <ResultChart poll={poll} />
        </div>
      ) : (
        <form
          className="poll-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleVote();
          }}
        >
          <h3>Cast Your Vote:</h3>
          {error && <p className="poll-error">{error}</p>}
          {poll.options.map((opt, idx) => (
            <label key={idx} className="poll-option">
              <input
                type="radio"
                name="pollOption"
                value={idx}
                checked={selectedOption === idx.toString()}
                onChange={(e) => setSelectedOption(e.target.value)}
              />
              {opt.text}
            </label>
          ))}
          <button type="submit" className="vote-btn">Submit Vote</button>
        </form>
      )}
    </div>
  );
}
