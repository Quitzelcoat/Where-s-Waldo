const express = require('express');
const { getLeaderboard, postScore } = require('../controllers/scoreController');
const router = express.Router();

router.get('/leaderboard', getLeaderboard);
router.post('/score', postScore);

module.exports = router;
