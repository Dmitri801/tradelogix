/*
  Warnings:

  - You are about to drop the `Workflow` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Trade" ADD COLUMN     "entryTimeframe" TEXT,
ADD COLUMN     "exitTimeframe" TEXT,
ADD COLUMN     "marketCondition" TEXT,
ADD COLUMN     "setupType" TEXT,
ADD COLUMN     "stopLoss" DOUBLE PRECISION,
ADD COLUMN     "strike" DOUBLE PRECISION,
ADD COLUMN     "target" DOUBLE PRECISION;

-- DropTable
DROP TABLE "public"."Workflow";
