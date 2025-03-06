const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

// Hard-code coordinates for testing
const characters = {
  'Red Shorts Guy': { x: 0.78, y: 0.16, tolerance: 0.05 },
  'Briefcase Lady': { x: 0.43, y: 0.85, tolerance: 0.05 },
  'Beach Dog': { x: 0.64, y: 0.27, tolerance: 0.05 },
};

// server running
app.get('/', (req, res) => {
  res.send('Hello World it is running');
});

// send the characters to frontend for display.
app.post('/validate', (req, res) => {
  const { character, x, y } = req.body;

  if (!character || typeof x !== 'number' || typeof y !== 'number') {
    res.status(400).send('Invalid request');
    return;
  }

  const target = characters[character];
  if (!target) {
    res.status(404).send('Character not found');
    return;
  }

  const withinX = Math.abs(x - target.x) <= target.tolerance;
  const withinY = Math.abs(y - target.y) <= target.tolerance;

  if (withinX && withinY) {
    return res.json({ success: true, message: `You found ${character}!` });
  } else {
    return res.json({ success: false, message: `Not quite, try again!` });
  }
});

// server port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
