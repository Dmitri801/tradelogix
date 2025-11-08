/*
  Warnings:

  - Made the column `size` on table `TradeAction` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "TradeAction" ADD COLUMN     "fees" DOUBLE PRECISION NOT NULL DEFAULT 0,
ALTER COLUMN "size" SET NOT NULL,
ALTER COLUMN "timestamp" DROP DEFAULT;
