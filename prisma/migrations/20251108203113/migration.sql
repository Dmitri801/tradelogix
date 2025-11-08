/*
  Warnings:

  - You are about to drop the column `status` on the `Trade` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "TradeStatusEnum" AS ENUM ('OPEN', 'CLOSED', 'PENDING', 'CANCELLED');

-- AlterTable
ALTER TABLE "Trade" DROP COLUMN "status";

-- DropEnum
DROP TYPE "public"."TradeStatus";

-- CreateTable
CREATE TABLE "TradeStatus" (
    "id" TEXT NOT NULL,
    "tradeId" TEXT NOT NULL,
    "status" "TradeStatusEnum" NOT NULL DEFAULT 'PENDING',
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TradeStatus_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TradeStatus" ADD CONSTRAINT "TradeStatus_tradeId_fkey" FOREIGN KEY ("tradeId") REFERENCES "Trade"("id") ON DELETE CASCADE ON UPDATE CASCADE;
