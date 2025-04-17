/*
  Warnings:

  - You are about to drop the column `score` on the `HighScore` table. All the data in the column will be lost.
  - Added the required column `time` to the `HighScore` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "HighScore" DROP COLUMN "score",
ADD COLUMN     "time" INTEGER NOT NULL;
