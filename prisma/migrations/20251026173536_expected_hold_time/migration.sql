-- CreateEnum
CREATE TYPE "ExpectedHoldTime" AS ENUM ('DAY', 'SWING', 'LONG');

-- AlterTable
ALTER TABLE "Trade" ADD COLUMN     "expectedHoldTime" "ExpectedHoldTime" NOT NULL DEFAULT 'DAY',
ALTER COLUMN "assetType" SET DEFAULT 'STOCK';
