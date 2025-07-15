import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from './Auth';

export default function CreatePoll() {
  const [title, setTitle] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleOptionChange = (value, index) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOption = () => {
    if (options.length < 5) {
      setOptions([...options, '']);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const currentUser = getCurrentUser();
    if (!currentUser) {
      setError("You must be logged in to create a poll.");
      return;
    }

    const filteredOptions = options.filter(opt => opt.trim() !== '');
    if (title.trim() === '' || filteredOptions.length < 2) {
      setError("Please provide a title and at least two options.");
      return;
    }

    const polls = JSON.parse(localStorage.getItem('polls') || '[]');
    const newPoll = {
      id: Date.now().toString(), // unique ID
      title,
      options: filteredOptions.map(opt => ({ text: opt, votes: 0 })),
      createdBy: currentUser,
    };

    polls.push(newPoll);
    localStorage.setItem('polls', JSON.stringify(polls));
    navigate(`/poll/${newPoll.id}`);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Create New Poll</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Poll Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        /><br /><br />

        {options.map((opt, idx) => (
          <div key={idx}>
            <input
              type="text"
              placeholder={`Option ${idx + 1}`}
              value={opt}
              onChange={(e) => handleOptionChange(e.target.value, idx)}
              required
            /><br /><br />
          </div>
        ))}

        {options.length < 5 && (
          <button type="button" onClick={addOption}>+ Add Option</button>
        )}
        <br /><br />
        <button type="submit">Create Poll</button>
      </form>
    </div>
  );
}
