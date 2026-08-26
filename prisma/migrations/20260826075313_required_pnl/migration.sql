/*
  Warnings:

  - Made the column `pnl` on table `Trade` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Trade" ALTER COLUMN "pnl" SET NOT NULL;
