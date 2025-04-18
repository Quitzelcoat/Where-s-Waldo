/* eslint-disable react/prop-types */
import { useState } from 'react';
import axios from 'axios';

const HighScore = ({ score, onClose, onSaved }) => {
  const [name, setName] = useState('');

  const save = async (e) => {
    e.preventDefault();
    if (!name) return;
    const res = await axios.post('http://localhost:3000/scores', {
      name,
      time: score,
    });
    onSaved && onSaved(res.data);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Your Time: {score}s</h2>
        <form onSubmit={save}>
          <input
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button>Save Score</button>
        </form>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default HighScore;
