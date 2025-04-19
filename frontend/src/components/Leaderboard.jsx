import { useState, useEffect } from 'react';
import axios from 'axios';

const Leaderboard = () => {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('http://localhost:3000/leaderboard')
      .then((res) => setScores(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div>Loading Scores...</div>;
  }

  return (
    <div>
      <h2>Top Scores</h2>

      {scores.length === 0 ? (
        <p>Please play the game to record a score!</p>
      ) : (
        <ol>
          {scores.map((s) => (
            <li key={s.id}>
              {s.name} - {s.time}
            </li>
          ))}
        </ol>
      )}
    </div>
  );
};

export default Leaderboard;
