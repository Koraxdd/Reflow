-- AlterTable
ALTER TABLE "User" ADD COLUMN     "compactView" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "defaultChart" TEXT NOT NULL DEFAULT 'candlestick';
