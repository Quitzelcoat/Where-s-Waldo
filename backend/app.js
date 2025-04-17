const express = require('express');
const cors = require('cors');
const gameRoute = require('./routes/gameRoute');
const scoreRoutes = require('./routes/scoreRoutes');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/', gameRoute);
app.use('/', scoreRoutes);

// server port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
