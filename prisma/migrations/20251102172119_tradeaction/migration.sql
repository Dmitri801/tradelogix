-- AlterTable
ALTER TABLE "Trade" ADD COLUMN     "optionType" TEXT;

-- CreateTable
CREATE TABLE "TradeAction" (
    "id" TEXT NOT NULL,
    "tradeId" TEXT NOT NULL,
    "actionType" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "size" DOUBLE PRECISION,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TradeAction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TradeAction" ADD CONSTRAINT "TradeAction_tradeId_fkey" FOREIGN KEY ("tradeId") REFERENCES "Trade"("id") ON DELETE CASCADE ON UPDATE CASCADE;
