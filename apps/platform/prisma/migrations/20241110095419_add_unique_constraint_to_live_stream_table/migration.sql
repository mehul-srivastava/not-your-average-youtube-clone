/*
  Warnings:

  - A unique constraint covering the columns `[rtmpSecretKey]` on the table `LiveStream` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "LiveStream_rtmpSecretKey_key" ON "LiveStream"("rtmpSecretKey");
