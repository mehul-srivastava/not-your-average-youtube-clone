-- AlterTable
ALTER TABLE "LiveStream" ALTER COLUMN "isFinished" DROP NOT NULL,
ALTER COLUMN "isFinished" DROP DEFAULT;
