// src/App.jsx
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import GameBoard from './components/GameBoard';
import Leaderboard from './components/Leaderboard';
import './app.css';

export default function App() {
  return (
    <BrowserRouter>
      <nav>
        <NavLink to="/" end>
          Play
        </NavLink>
        {' | '}
        <NavLink to="/leaderboard">Leaderboard</NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<GameBoard />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </BrowserRouter>
  );
}
