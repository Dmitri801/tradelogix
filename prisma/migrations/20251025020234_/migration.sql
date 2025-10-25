/*
  Warnings:

  - You are about to drop the column `durationMinutes` on the `Trade` table. All the data in the column will be lost.
  - You are about to drop the column `entryDate` on the `Trade` table. All the data in the column will be lost.
  - You are about to drop the column `entryPrice` on the `Trade` table. All the data in the column will be lost.
  - You are about to drop the column `entryTimeframe` on the `Trade` table. All the data in the column will be lost.
  - You are about to drop the column `exitDate` on the `Trade` table. All the data in the column will be lost.
  - You are about to drop the column `exitPrice` on the `Trade` table. All the data in the column will be lost.
  - You are about to drop the column `exitTimeframe` on the `Trade` table. All the data in the column will be lost.
  - You are about to drop the column `fees` on the `Trade` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrls` on the `Trade` table. All the data in the column will be lost.
  - You are about to drop the column `marketCondition` on the `Trade` table. All the data in the column will be lost.
  - You are about to drop the column `notes` on the `Trade` table. All the data in the column will be lost.
  - You are about to drop the column `pnlAbsolute` on the `Trade` table. All the data in the column will be lost.
  - You are about to drop the column `pnlPercentage` on the `Trade` table. All the data in the column will be lost.
  - You are about to drop the column `preTradePlan` on the `Trade` table. All the data in the column will be lost.
  - You are about to drop the column `riskPerTrade` on the `Trade` table. All the data in the column will be lost.
  - You are about to drop the column `riskRewardRatio` on the `Trade` table. All the data in the column will be lost.
  - You are about to drop the column `setupType` on the `Trade` table. All the data in the column will be lost.
  - You are about to drop the column `stopLossPrice` on the `Trade` table. All the data in the column will be lost.
  - You are about to drop the column `strategyId` on the `Trade` table. All the data in the column will be lost.
  - You are about to drop the column `takeProfitPrice` on the `Trade` table. All the data in the column will be lost.
  - You are about to drop the `Strategy` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TradeTag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Strategy" DROP CONSTRAINT "Strategy_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Tag" DROP CONSTRAINT "Tag_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Trade" DROP CONSTRAINT "Trade_strategyId_fkey";

-- DropForeignKey
ALTER TABLE "public"."TradeTag" DROP CONSTRAINT "TradeTag_tagId_fkey";

-- DropForeignKey
ALTER TABLE "public"."TradeTag" DROP CONSTRAINT "TradeTag_tradeId_fkey";

-- DropIndex
DROP INDEX "public"."Trade_userId_symbol_entryDate_idx";

-- DropIndex
DROP INDEX "public"."Trade_userId_symbol_entryDate_key";

-- AlterTable
ALTER TABLE "Trade" DROP COLUMN "durationMinutes",
DROP COLUMN "entryDate",
DROP COLUMN "entryPrice",
DROP COLUMN "entryTimeframe",
DROP COLUMN "exitDate",
DROP COLUMN "exitPrice",
DROP COLUMN "exitTimeframe",
DROP COLUMN "fees",
DROP COLUMN "imageUrls",
DROP COLUMN "marketCondition",
DROP COLUMN "notes",
DROP COLUMN "pnlAbsolute",
DROP COLUMN "pnlPercentage",
DROP COLUMN "preTradePlan",
DROP COLUMN "riskPerTrade",
DROP COLUMN "riskRewardRatio",
DROP COLUMN "setupType",
DROP COLUMN "stopLossPrice",
DROP COLUMN "strategyId",
DROP COLUMN "takeProfitPrice",
ALTER COLUMN "size" DROP NOT NULL;

-- DropTable
DROP TABLE "public"."Strategy";

-- DropTable
DROP TABLE "public"."Tag";

-- DropTable
DROP TABLE "public"."TradeTag";
