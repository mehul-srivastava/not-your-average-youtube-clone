/*
  Warnings:

  - The `isFinished` column on the `LiveStream` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ENDED', 'NOT_STARTED', 'RUNNING');

-- AlterTable
ALTER TABLE "LiveStream" DROP COLUMN "isFinished",
ADD COLUMN     "isFinished" "Status" NOT NULL DEFAULT 'NOT_STARTED';
