-- AlterTable
ALTER TABLE "User" ADD COLUMN     "cryptoNews" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "dailySummary" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "emailAlerts" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "priceAlerts" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "tradeExecuted" BOOLEAN NOT NULL DEFAULT true;
