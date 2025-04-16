const prisma = require('../db/prismaClient');

const validateCharacter = async (req, res) => {
  const { character, x, y } = req.body;

  if (!character || typeof x !== 'number' || typeof y !== 'number') {
    return res
      .status(400)
      .json({ success: false, message: 'Invalid request data.' });
  }

  const target = await prisma.character.findUnique({
    where: { name: character },
  });

  if (!target) {
    return res
      .status(404)
      .json({ success: false, message: 'Character not found.' });
  }

  const withinX = Math.abs(x - target.x) <= target.tolerance;
  const withinY = Math.abs(y - target.y) <= target.tolerance;

  if (withinX && withinY) {
    return res.json({ success: true, message: `You found ${character}!` });
  } else {
    return res.json({ success: false, message: `Not quite, try again!` });
  }
};

module.exports = {
  validateCharacter,
};
