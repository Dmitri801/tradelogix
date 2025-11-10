-- AlterTable
ALTER TABLE "Trade" ADD COLUMN     "status" "TradeStatusEnum" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "statusId" TEXT;
