const prisma = require('../db/prismaClient');

async function main() {
  const characters = [
    { name: 'Red Shorts Guy', x: 0.78, y: 0.16, tolerance: 0.05 },
    { name: 'Briefcase Lady', x: 0.43, y: 0.85, tolerance: 0.05 },
    { name: 'Beach Dog', x: 0.64, y: 0.27, tolerance: 0.05 },
  ];

  for (const character of characters) {
    await prisma.character.create({ data: character });
  }

  console.log('Seeding completed successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
