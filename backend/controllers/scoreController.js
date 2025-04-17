const prisma = require('../db/prismaClient');

const getLeaderboard = async (req, res) => {
  const scores = await prisma.score.findMany({
    orderBy: { time: 'asc' },
    take: 10,
  });
  res.json(scores);
};

const postScore = async (req, res) => {
  const { name, time } = req.body;
  if (!name || typeof time !== 'number') {
    return res.status(400).json({ error: 'Invalid data' });
  }
  const newScore = await prisma.score.create({
    data: { name, time },
  });
  res.json(newScore);
};

module.exports = {
  getLeaderboard,
  postScore,
};
