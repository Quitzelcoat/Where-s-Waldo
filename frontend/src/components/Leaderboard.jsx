import { useState, useEffect } from 'react';
import axios from 'axios';

const Leaderboard = () => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3000/leaderboard')
      .then((res) => setScores(res.data))
      .catch(console.error);
  }, []);

  return (
    <div>
      <h2>Top Scores</h2>
      <ol>
        {scores.map((s) => {
          <li key={s.id}>
            {s.name} - {s.time}
          </li>;
        })}
      </ol>
    </div>
  );
};

export default Leaderboard;
