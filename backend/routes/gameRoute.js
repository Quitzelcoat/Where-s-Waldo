const express = require('express');
const router = express.Router();
const { validateCharacter } = require('../controllers/gameController');

router.get('/', (req, res) => {
  res.send('Hello World it is running');
});

router.post('/validate', validateCharacter);

module.exports = router;
