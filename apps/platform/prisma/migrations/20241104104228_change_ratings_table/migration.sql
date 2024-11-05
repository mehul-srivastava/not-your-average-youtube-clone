/*
  Warnings:

  - The primary key for the `Rating` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `dislikes` on the `Rating` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Rating` table. All the data in the column will be lost.
  - You are about to drop the column `likes` on the `Rating` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Choice" AS ENUM ('DISLIKE', 'NEUTRAL', 'LIKE');

-- AlterTable
ALTER TABLE "Rating" DROP CONSTRAINT "Rating_pkey",
DROP COLUMN "dislikes",
DROP COLUMN "id",
DROP COLUMN "likes",
ADD COLUMN     "choice" "Choice" NOT NULL DEFAULT 'DISLIKE',
ADD CONSTRAINT "Rating_pkey" PRIMARY KEY ("userId", "videoId");
