/*
  Warnings:

  - A unique constraint covering the columns `[videoId]` on the table `Rating` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Rating_videoId_key" ON "Rating"("videoId");
